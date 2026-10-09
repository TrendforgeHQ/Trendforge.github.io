const GENERIC = new Set([
  'about','after','again','also','been','being','could','from','have','into','more','most','over','said','some','than','that','their','there','these','they','this','what','when','which','with','will','would','your',
  'technology','digital','latest','news','article','story','report','reports','reported','according','development','developments','company','companies','industry','open','source','using','used','use','much','does','how','the','costs'
]);
const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').split(/\\s+/).filter(Boolean);
const anchorTokens = value => new Set(normalize(value).filter(word => word.length >= 4 && !GENERIC.has(word)));

export function assessCandidateSourceAlignment(candidate = {}, source = {}) {
  const candidateText = String(candidate.title || '') + ' ' + String(candidate.description || '');
  const anchors = anchorTokens(candidateText);
  if (!anchors.size) return { aligned: true, reason: 'no-specific-candidate-anchors', sharedAnchors: [] };
  const headline = String(source.title || '') + ' ' + String(source.description || '');
  const headlineAnchors = anchorTokens(headline);
  const bodyAnchors = anchorTokens(String(source.body || '') + ' ' + (Array.isArray(source.passages) ? source.passages.join(' ') : ''));
  const headlineShared = [...anchors].filter(word => headlineAnchors.has(word));
  const bodyShared = [...anchors].filter(word => bodyAnchors.has(word));
  const aligned = headlineShared.length >= 1 || bodyShared.length >= 2;
  return {
    aligned,
    reason: aligned ? 'candidate-specific-anchor-match' : 'publisher-page-does-not-match-candidate-story',
    sharedAnchors: [...new Set([...headlineShared, ...bodyShared])],
    headlineShared,
    bodyShared
  };
}
