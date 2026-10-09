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

  // A single generic overlap (for example, "software") must not make a
  // different open-source story look relevant to a cost-focused candidate.
  // Short candidate anchor sets require all available anchors to match;
  // richer descriptions require multiple independent matches.
  const headlineThreshold = Math.min(2, anchors.size);
  const bodyThreshold = Math.min(3, anchors.size);
  const aligned = headlineShared.length >= headlineThreshold || bodyShared.length >= bodyThreshold;
  return {
    aligned,
    reason: aligned ? 'candidate-specific-anchor-match' : 'publisher-page-does-not-match-candidate-story',
    sharedAnchors: [...new Set([...headlineShared, ...bodyShared])],
    headlineShared,
    bodyShared,
    thresholds: { headline: headlineThreshold, body: bodyThreshold }
  };
}
