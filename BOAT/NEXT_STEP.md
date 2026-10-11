# BOAT Next Step

## Next task: finish the read-only interface map

**Phase:** 0  
**Risk:** Low  
**Provider cost:** None expected  
**Production behavior change:** None

### Goal
Document the actual input/output contracts and provenance for existing TrendForge artifacts before implementing BOAT runtime code.

### Files and areas to inspect
- Article content and published-article indexing.
- Evidence pack and evidence integrity outputs.
- Claim verification and grounding repair outputs.
- Editorial quality and image-safety outputs.
- Memory, audit trail, supervisor, and self-learning data contracts.
- Existing deterministic tests and archived workflow artifacts.

### Required deliverables
1. Add a table to `BASELINE_AUDIT.md` mapping artifact path, producer, consumer, provenance fields, and known gaps.
2. Identify at least three saved, reproducible failure examples; if the evidence is unavailable, record the gap rather than invent examples.
3. Define the first Article Doctor report schema and fixtures.
4. Add a test plan that runs locally/CI without paid provider calls.
5. Update `PROJECT_STATE.md`, `CHANGELOG.md`, and `LEARNINGS.md` with actual findings and test results.

### Guardrails
- Read-only inspection only.
- Do not modify publishing workflows or articles.
- Do not call paid providers.
- Do not change gates or thresholds.
- Do not merge without reviewing PR checks and the resulting diff.
