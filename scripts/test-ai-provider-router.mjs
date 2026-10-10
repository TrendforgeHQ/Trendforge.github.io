import assert from 'node:assert/strict';
import { classify, reliabilityScore, state, orderHealthyProviders } from './ai-provider-router.mjs';

assert.equal(classify(429, 'tokens per minute exceeded'), 'rate_limit');
assert.equal(classify(429, 'daily quota exceeded'), 'quota');
assert.equal(classify(503, 'service unavailable'), 'server');
assert.equal(classify(401, 'unauthorized'), 'auth');

state.providers.Groq.history = [
  { ok: true, class: 'success' }, { ok: true, class: 'success' },
  { ok: false, class: 'rate_limit' }
];
state.providers.Cohere.history = [
  { ok: false, class: 'transient' }, { ok: false, class: 'transient' },
  { ok: true, class: 'success' }
];
assert.ok(reliabilityScore('Groq') > reliabilityScore('Cohere'));

console.log('Phase 11 adaptive provider routing tests passed.');

state.providers.Groq.history = [{ ok: false, class: 'transient' }];
state.providers.Gemini.history = Array.from({ length: 10 }, () => ({ ok: true, class: 'success' }));
assert.deepEqual(orderHealthyProviders(['Gemini', 'Cohere', 'Groq']), ['Groq', 'Gemini', 'Cohere']);
assert.deepEqual(orderHealthyProviders(['OpenRouter', 'Cohere', 'Gemini']), ['Gemini', 'Cohere', 'OpenRouter']);
assert.deepEqual(orderHealthyProviders(['Cohere', 'Gemini', 'Cohere']), ['Gemini', 'Cohere', 'Cohere']);
