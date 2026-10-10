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

// Deterministic provider-order contract: Groq leads whenever it is in the healthy
// set, even when another provider has a higher reliability score; remaining
// providers use reliability score and stable tie-break priority.
state.providers.Groq.history = [{ ok: false, class: 'transient' }];
state.providers.Gemini.history = Array.from({ length: 10 }, () => ({ ok: true, class: 'success' }));
state.providers.Cohere.history = [{ ok: true, class: 'success' }];
state.providers.OpenRouter.history = [{ ok: false, class: 'transient' }];
assert.deepEqual(orderHealthyProviders(['Gemini', 'Cohere', 'Groq', 'OpenRouter']), ['Groq', 'Gemini', 'Cohere', 'OpenRouter'], 'Groq must lead even if its reliability score is lower');
assert.deepEqual(orderHealthyProviders(['OpenRouter', 'Cohere', 'Gemini']), ['Gemini', 'Cohere', 'OpenRouter'], 'without Groq, providers should rank by reliability');
assert.deepEqual(orderHealthyProviders(['OpenRouter', 'Cohere']), ['Cohere', 'OpenRouter'], 'fallback tie-breaking must be deterministic');

console.log('Phase 11 adaptive provider routing tests passed.');
