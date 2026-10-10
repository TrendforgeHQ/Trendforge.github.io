import assert from 'node:assert/strict';

process.env.GEMINI_API_KEY='test-only';
process.env.COHERE_API_KEY='test-only';
process.env.OPENROUTER_API_KEY='test-only';
process.env.GEMINI_MODEL='gemini-3.6-flash';
process.env.OPENROUTER_MODEL='openrouter/free';
process.env.COHERE_MODEL='command-a-plus-05-2026';

const originalFetch=globalThis.fetch;
const { request: requestProviderForTest, parseWriterJson, assessWriterTopicAlignment }=await import('./trendforge-writer-engine.mjs');

function response(status, payload, headers={}) {
  return {
    ok: status>=200&&status<300,
    status,
    headers:{get(name){return headers[name.toLowerCase()]??null;}},
    async json(){return payload;},
    async text(){return typeof payload==='string'?payload:JSON.stringify(payload);}
  };
}

try {
  // Gemini: mocked response proves the adapter extracts candidate text and usage diagnostics,
  // while the outgoing request explicitly minimizes Gemini 3 Flash thinking.
  let captured=null;
  globalThis.fetch=async(url,init)=>{
    captured={url:String(url),body:JSON.parse(init.body)};
    return response(200,{
      modelVersion:'gemini-3.6-flash-test',
      candidates:[{finishReason:'STOP',content:{parts:[{text:'{"title":"Test","description":"Test description","content":"Test body"}'}]}}],
      usageMetadata:{candidatesTokenCount:21,thoughtsTokenCount:3}
    });
  };
  const gemini=await requestProviderForTest('Gemini','fixture prompt','fixture system',{}, {maxCompletionTokens:900});
  assert.equal(captured.body.generationConfig.thinkingConfig.thinkingLevel,'minimal');
  assert.equal(captured.body.generationConfig.maxOutputTokens,900);
  assert.match(gemini.text,/"title":"Test"/);
  assert.equal(gemini.diagnostics.finishReason,'STOP');
  assert.equal(gemini.diagnostics.candidateTokenCount,21);
  assert.equal(gemini.diagnostics.thoughtsTokenCount,3);

  // Cohere: only text blocks are returned as model output; finish reason and block
  // types remain visible for diagnosis of structured-output rejections.
  globalThis.fetch=async(url,init)=>{
    captured={url:String(url),body:JSON.parse(init.body)};
    return response(200,{
      finish_reason:'COMPLETE',
      message:{id:'fixture-message',content:[
        {type:'thinking',thinking:'hidden reasoning block'},
        {type:'text',text:'{"title":"Cohere test","description":"A test description","content":"Test body"}'}
      ]}
    });
  };
  const cohere=await requestProviderForTest('Cohere','fixture prompt','fixture system',{}, {maxCompletionTokens:900});
  assert.equal(captured.url,'https://api.cohere.com/v2/chat');
  assert.equal(captured.body.thinking.type,'disabled');
  assert.match(cohere.text,/"title":"Cohere test"/);
  assert.equal(cohere.diagnostics.finishReason,'COMPLETE');
  assert.deepEqual(cohere.diagnostics.contentTypes,['thinking','text']);
  assert.equal(cohere.diagnostics.thinkingBlocks,1);

  // OpenRouter: adapter uses the configured dynamic free router and preserves finish
  // reason diagnostics. No network call is made.
  globalThis.fetch=async(url,init)=>{
    captured={url:String(url),body:JSON.parse(init.body)};
    return response(200,{model:'fixture/free-model',choices:[{finish_reason:'stop',message:{content:'{"title":"Router test","description":"A test description","content":"Test body"}'}}]});
  };
  const router=await requestProviderForTest('OpenRouter','fixture prompt','fixture system',{}, {maxCompletionTokens:900});
  assert.equal(captured.body.model,'openrouter/free');
  assert.equal(captured.body.provider.require_parameters,true);
  assert.equal(router.diagnostics.finishReason,'stop');
  assert.equal(router.diagnostics.model,'fixture/free-model');

  // OpenRouter truncation regression: if a model returns finish_reason=length,
  // retry once through the dynamic free router with a larger visible-output budget.
  // This is fully mocked and makes no live provider request.
  let openRouterRecoveryAttempts=0;
  const openRouterRequestBodies=[];
  globalThis.fetch=async(url,init)=>{
    openRouterRecoveryAttempts++;
    const body=JSON.parse(init.body);
    openRouterRequestBodies.push(body);
    if(openRouterRecoveryAttempts===1) {
      return response(200,{model:'liquid/lfm-2.5-2.6b:free',choices:[{finish_reason:'length',message:{content:'{"title":"Truncated"'}}]});
    }
    return response(200,{model:'fixture/recovered-free-model',choices:[{finish_reason:'stop',message:{content:'{"title":"Recovered router","description":"Recovered description","content":"Recovered article body"}'}}]});
  };
  const recoveredRouter=await requestProviderForTest('OpenRouter','fixture prompt','fixture system',{}, {maxCompletionTokens:900});
  assert.equal(openRouterRecoveryAttempts,2,'truncated OpenRouter JSON should trigger exactly one recovery request');
  assert.equal(openRouterRequestBodies[0].model,'openrouter/free');
  assert.equal(openRouterRequestBodies[1].model,'openrouter/free','recovery must use the dynamic free router rather than repeat a tiny configured model');
  assert.equal(openRouterRequestBodies[1].max_tokens,6000,'recovery should expand the output token budget');
  assert.equal('reasoning' in openRouterRequestBodies[1],false,'dynamic free-router recovery should not send a model-specific reasoning budget');
  assert.match(recoveredRouter.text,/"title":"Recovered router"/);
  assert.equal(recoveredRouter.diagnostics.finishReason,'stop');
  assert.equal(recoveredRouter.diagnostics.model,'fixture/recovered-free-model');

  // OpenRouter may return HTTP 200 with an embedded routing/provider error and no
  // message content. Preserve safe error metadata instead of silently losing it.
  globalThis.fetch=async()=>response(200,{id:'fixture-error-id',model:'dots-studio/dots-3-note-preview:free',choices:[{finish_reason:'error',message:{content:'',error:{code:'provider_unavailable',message:'Selected provider could not serve this model.'}}}]});
  const routerError=await requestProviderForTest('OpenRouter','fixture prompt','fixture system',{}, {maxCompletionTokens:900});
  assert.equal(routerError.text,'');
  assert.equal(routerError.diagnostics.finishReason,'error');
  assert.equal(routerError.diagnostics.model,'dots-studio/dots-3-note-preview:free');
  assert.equal(routerError.diagnostics.responseId,'fixture-error-id');
  assert.deepEqual(routerError.diagnostics.providerError,{code:'provider_unavailable',message:'Selected provider could not serve this model.'});

  // A 429 without any retry/reset hint must fail immediately; this prevents a
  // mocked test from sleeping or accidentally creating retry traffic.
  let attempts=0;
  globalThis.fetch=async()=>{attempts++;return response(429,'rate limited');};
  await assert.rejects(()=>requestProviderForTest('OpenRouter','fixture prompt','fixture system',{}, {maxCompletionTokens:900}),/^Error: 429: rate limited$/);
  assert.equal(attempts,1,'429 without an explicit reset hint must not retry');

  // Writer-level integration boundary: every provider's extracted text must pass the same
  // parser and required-field contract before editorial validation starts. All fixtures are
  // local; this section makes no provider requests and does not load the article pipeline.
  const validWriterJson='{"title":"Contract title","description":"Contract description","content":"Contract body"}';
  for (const [label,raw] of [
    ['strict JSON',validWriterJson],
    ['fenced JSON','```json\n'+validWriterJson+'\n```'],
    ['JSON embedded in wrapper text','Provider output: '+validWriterJson+' End of output.'],
    ['JSON followed by a separate braced diagnostic','Provider output: '+validWriterJson+' Diagnostic: {"status":"complete"}']
  ]) {
    const parsed=parseWriterJson(raw);
    assert.ok(parsed, label+' should parse');
    for (const field of ['title','description','content']) {
      assert.equal(typeof parsed[field],'string',label+' should provide string '+field);
      assert.ok(parsed[field].trim().length>0,label+' should provide non-empty '+field);
    }
  }
  for (const [label,raw] of [
    ['empty output',''],
    ['whitespace output','   \n  '],
    ['malformed JSON','{"title":"broken"'],
    ['array output','[{"title":"not an object"}]'],
    ['missing required field','{"title":"Only title","description":"No content"}'],
    ['empty required field','{"title":"Title","description":"Description","content":"  "}']
  ]) {
    const parsed=parseWriterJson(raw);
    const valid=Boolean(parsed&&['title','description','content'].every(field=>typeof parsed[field]==='string'&&parsed[field].trim().length>0));
    assert.equal(valid,false,label+' must not pass the writer response contract');
  }

  // Story-title drift regression: shared generic words such as "open source"
  // must not let a security-funding article pass for a cost-of-software story.
  const requestedStory='How much does it cost to use open source software?';
  assert.equal(assessWriterTopicAlignment(requestedStory, {
    title:'Major Tech Firms Pledge $12.5 Million for Open Source Security',
    description:'A collective funding pledge and research on open source software adoption highlight security efforts.',
    content:'The article covers a security pledge and then mentions software cost savings.'
  }).passed, false, 'writer must reject a draft whose title has drifted to a neighboring story');
  assert.equal(assessWriterTopicAlignment(requestedStory, {
    title:'The Value of Open Source Software Is More Than Cost Savings',
    description:'A survey examines why companies adopt open source software.',
    content:'The survey identifies cost savings, customization, and community expertise.'
  }).passed, true, 'writer should accept a genuinely aligned cost-of-software title');

  // Cohere timeout regression: Node's AbortSignal timeout commonly reports
  // "The operation was aborted due to timeout". Verify the request layer retries
  // that exact error and succeeds on the next bounded attempt, without live network.
  let cohereTimeoutAttempts=0;
  globalThis.fetch=async(url,init)=>{
    cohereTimeoutAttempts++;
    captured={url:String(url),body:JSON.parse(init.body)};
    if(cohereTimeoutAttempts===1) throw new DOMException('The operation was aborted due to timeout','TimeoutError');
    return response(200,{
      finish_reason:'COMPLETE',
      message:{id:'fixture-timeout-retry',content:[{type:'text',text:'{"title":"Recovered Cohere","description":"Recovered description","content":"Recovered article body"}'}]}
    });
  };
  const recoveredCohere=await requestProviderForTest('Cohere','fixture prompt','fixture system',{}, {maxCompletionTokens:900});
  assert.equal(cohereTimeoutAttempts,2,'Cohere should retry once after the abort timeout');
  assert.match(recoveredCohere.text,/"title":"Recovered Cohere"/);
  assert.equal(recoveredCohere.diagnostics.finishReason,'COMPLETE');

  console.log('PASS: mocked provider contract tests (Gemini, Cohere including timeout retry, OpenRouter, no-hint 429). No live provider requests were made.');
} finally {
  globalThis.fetch=originalFetch;
}
