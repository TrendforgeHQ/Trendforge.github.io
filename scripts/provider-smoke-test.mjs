import assert from 'node:assert/strict';
import { request } from './trendforge-writer-engine.mjs';

const provider=String(process.env.PROVIDER_SMOKE_TARGET||'').trim();
const allowed=new Set(['Gemini','Cohere','OpenRouter']);
if(!allowed.has(provider)) throw new Error('Set PROVIDER_SMOKE_TARGET to exactly one of Gemini, Cohere, or OpenRouter.');

const keyName={Gemini:'GEMINI_API_KEY',Cohere:'COHERE_API_KEY',OpenRouter:'OPENROUTER_API_KEY'}[provider];
if(!process.env[keyName]) throw new Error(`Missing required secret: ${keyName}`);

const schema={type:'object',properties:{
  title:{type:'string'},description:{type:'string'},content:{type:'string'}
},required:['title','description','content'],additionalProperties:false};
const formats={
  Gemini:{type:'json_object'},
  Cohere:{type:'json_object',schema},
  OpenRouter:{type:'json_object'}
};
const prompt=[
  'This is a provider response-contract smoke test, not a news article.',
  'Return one JSON object with exactly three non-empty string fields: title, description, content.',
  'Use title "Provider smoke test", description "Structured response contract check.", and content "The response contains the required fields."',
  'Do not add any other keys or text outside the JSON object.'
].join('\n');

const result=await request(provider,prompt,'Return only the requested JSON object.',formats[provider],{maxCompletionTokens:300});
let parsed;
try { parsed=JSON.parse(String(result.text||'')); }
catch { throw new Error(`${provider} returned non-JSON output; diagnostics=${JSON.stringify(result.diagnostics||{})}`); }
assert.ok(parsed&&typeof parsed==='object'&&!Array.isArray(parsed),'Response must be a JSON object.');
for(const field of ['title','description','content']) {
  assert.equal(typeof parsed[field],'string',`Missing/non-string required field: ${field}`);
  assert.ok(parsed[field].trim().length>0,`Empty required field: ${field}`);
}
assert.deepEqual(Object.keys(parsed).sort(),['content','description','title'],'Unexpected keys in response.');
console.log(`PASS: ${provider} live response-contract smoke test. model=${result.diagnostics?.model||process.env[provider==='Gemini'?'GEMINI_MODEL':provider==='Cohere'?'COHERE_MODEL':'OPENROUTER_MODEL']||'provider default'} diagnostics=${JSON.stringify(result.diagnostics||{})}`);
if(result.usage) console.log(`Usage metadata: ${JSON.stringify(result.usage)}`);
