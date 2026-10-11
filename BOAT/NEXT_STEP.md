# BOAT Next Step

## Current task: Phase 1 offline Article Doctor
Risk: low. Provider cost: none. Production behavior change: none.

### Phase 0.2 source inspection complete
- Artifact interface map added to BASELINE_AUDIT.md.
- Three archived claim-verification reports indexed in fixtures/article-doctor-fixtures.json.
- Initial report schema added in schemas/article-doctor-report.schema.json.
- Offline acceptance plan added in TEST_PLAN.md.

### Next implementation
1. Build a pure/offline reader for an article, archived claim report, and optional metadata.
2. Emit the schema's read-only report; each finding points to an exact artifact and field.
3. Test unsupported claims, attribution uncertainty, numeric mismatch/scope warnings, malformed/missing inputs, article-title/run mismatch, and deterministic output.
4. Hash inputs before/after and prove no mutation.
5. Use AD-FX-001..003 as parser/signal-extraction fixtures only; do not claim independent fact-checking.
6. Record test commands, exit codes, commit SHA, and actual outcomes.

### Guardrails
- No paid providers, external fetches, article edits, workflow dispatch, image generation, or publishing runs.
- Do not change gates, thresholds, provider routing, production articles, or publishing workflow.
- Keep work on the BOAT branch or a dedicated BOAT branch; do not write to main.
- Review PR #35 diff and actual CI results before any merge.
