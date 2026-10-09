import assert from 'node:assert/strict';
import { request, parseWriterJson, assessWriterTopicAlignment } from './trendforge-writer-engine.mjs';

const provider=String(process.env.PROVIDER_WRITER_TARGET||'').trim();
const allowed=new Set(['Cohere','OpenRouter']);
if(!allowed.has(provider)) throw new Error('Set PROVIDER_WRITER_TARGET to exactly Cohere or OpenRouter.');
const keyName={Cohere:'COHERE_API_KEY',OpenRouter:'OPENROUTER_API_KEY'}[provider];
if(!process.env[keyName]) throw new Error(`Missing required secret: ${keyName}`);

const requestedTitle='How Passkeys Change the Sign-In Process';
const evidence=[
  'Passkeys use public-key cryptography instead of asking a user to type a reusable account password.',
  'During setup, a device or password manager creates a key pair: a private key and a public key.',
  'The private key remains with the user’s device or credential manager; the service stores the corresponding public key.',
  'To sign in, the service sends a challenge that the credential uses to produce a cryptographic response.',
  'A user may unlock a passkey with the device’s supported screen lock, biometric check, or another local verification method.',
  'Passkeys are designed to resist phishing because credentials are associated with the legitimate website or app identity.',
  'Account recovery, device replacement, and cross-device availability depend on the platform and credential-management setup.'
];
const system=[
  'You are a careful technology publication writer.',
  'Use only the evidence packet below for factual claims. Do not add outside facts, statistics, dates, companies, or unsupported benefits.',
  'Write a useful, coherent article for general readers. Keep the requested story topic.',
  'Return only one JSON object with exactly title, description, and content. All three values must be non-empty strings.',
  'The content should be approximately 220–300 words, have a short introduction and 2–3 meaningful Markdown H2 sections, and end with a practical, evidence-supported takeaway.',
  'Do not repeat sentences or pad the article. Do not use the words “robust” or “delve”.'
].join(' ');
const prompt=[
  `Title: ${requestedTitle}`,
  'Task: produce a publishable first-draft technology explainer, not a test description.',
  'Evidence packet (sole factual source):',
  ...evidence.map((item,i)=>`${i+1}. ${item}`),
  'Write the article now. Do not mention this test, the evidence packet, or these instructions.'
].join('\n');

const schema={type:'object',properties:{title:{type:'string'},description:{type:'string'},content:{type:'string'}},required:['title','description','content'],additionalProperties:false};
const formats={OpenRouter:{type:'json_object'},Cohere:{type:'json_object',schema}};
const started=Date.now();
const result=await request(provider,prompt,system,formats,{maxCompletionTokens:1600});
const raw=String(result.text||'');
const draft=parseWriterJson(raw);
if(!draft||typeof draft!=='object'||Array.isArray(draft)) {
  console.error(`DIAGNOSTIC: ${provider} returned non-parseable writer output; model=${result.diagnostics?.model||'unknown'}; finishReason=${result.diagnostics?.finishReason||'unknown'}; rawLength=${raw.length}; diagnostics=${JSON.stringify(result.diagnostics||{})}; rawPreview=${JSON.stringify(raw.slice(0,500))}`);
  throw new Error(`${provider}: response is not parseable JSON`);
}
assert.deepEqual(Object.keys(draft).sort(),['content','description','title'],`${provider}: unexpected JSON fields`);
for(const field of ['title','description','content']) assert.equal(typeof draft[field],'string',`${provider}: ${field} must be a string`);
for(const field of ['title','description','content']) assert.ok(draft[field].trim().length>0,`${provider}: ${field} is empty`);
const words=draft.content.trim().split(/\s+/).filter(Boolean).length;
assert.ok(words>=180,`${provider}: draft too short (${words} words; minimum 180)`);
const alignment=assessWriterTopicAlignment(requestedTitle,draft);
assert.ok(alignment.passed,`${provider}: draft failed topic alignment: ${JSON.stringify(alignment)}`);
const h2Count=(draft.content.match(/^##\s+.+$/gm)||[]).length;
assert.ok(h2Count>=1,`${provider}: article has no meaningful H2 section`);
const duplicateTitle=/provider smoke test|response contract/i.test(draft.title);
assert.ok(!duplicateTitle,`${provider}: returned a smoke-test placeholder instead of an article`);
console.log(`PASS: ${provider} writer-stage canary; model=${result.diagnostics?.model||'provider default'}; words=${words}; h2=${h2Count}; topicAligned=${alignment.passed}; ms=${Date.now()-started}; finishReason=${result.diagnostics?.finishReason||'unknown'}`);
console.log(`Title: ${draft.title}`);
console.log(`Description length: ${draft.description.length}; content length: ${draft.content.length}`);
if(result.usage) console.log(`Usage metadata: ${JSON.stringify(result.usage)}`);
