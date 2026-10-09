import assert from 'node:assert/strict';

process.env.GEMINI_API_KEY='test-only';
process.env.COHERE_API_KEY='test-only';
process.env.OPENROUTER_API_KEY='test-only';
process.env.GEMINI_MODEL='gemini-3.6-flash';
process.env.OPENROUTER_MODEL='openrouter/free';
process.env.COHERE_MODEL='command-a-plus-05-2026';

const originalFetch=globalThis.fetch;
const { request: requestProviderForTest }=await import('./trendforge-writer-engine.mjs');

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

  // A 429 without any retry/reset hint must fail immediately; this prevents a
  // mocked test from sleeping or accidentally creating retry traffic.
  let attempts=0;
  globalThis.fetch=async()=>{attempts++;return response(429,'rate limited');};
  await assert.rejects(()=>requestProviderForTest('OpenRouter','fixture prompt','fixture system',{}, {maxCompletionTokens:900}),/^Error: 429: rate limited$/);
  assert.equal(attempts,1,'429 without an explicit reset hint must not retry');

  console.log('PASS: mocked provider contract tests (Gemini, Cohere, OpenRouter, no-hint 429). No live provider requests were made.');
} finally {
  globalThis.fetch=originalFetch;
}
