import assert from 'node:assert/strict';
import { assessCandidateSourceAlignment } from './candidate-source-alignment.mjs';

const candidate = { title: 'How much does it cost to use open source software?' };
const securityStory = {
  title: 'Our latest investment in open source security for the AI era',
  body: 'Google and partners pledge $12.5 million for open source security and AI tools.'
};
const costStory = {
  title: 'The value of open source software is more than cost savings',
  body: 'A survey found cost savings are a primary reason companies adopt open source software.'
};
const automotiveStory = {
  title: 'Google to move beyond automotive infotainment software with new open source platform',
  body: 'Google described a new open source platform for automotive infotainment software, expanding its in-car technology offering.'
};

assert.equal(assessCandidateSourceAlignment(candidate, securityStory).aligned, false);
assert.equal(assessCandidateSourceAlignment(candidate, costStory).aligned, true);
assert.equal(assessCandidateSourceAlignment(candidate, automotiveStory).aligned, false);
assert.equal(assessCandidateSourceAlignment({title:'OpenAI launches new model'}, {title:'OpenAI launches new model'}).aligned, true);
console.log('Candidate/source alignment tests passed.');
