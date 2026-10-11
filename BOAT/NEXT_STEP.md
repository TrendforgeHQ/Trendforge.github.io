# BOAT Next Step

## Current task: verify Phase 1 offline Article Doctor
Risk: low. Provider cost: none. Production behavior change: none.

### Implemented on the dedicated BOAT branch
- Read-only evaluator: `scripts/boat-article-doctor.mjs`.
- Offline regression suite: `scripts/test-boat-article-doctor.mjs`.
- Isolated test workflow: `.github/workflows/boat-offline-tests.yml`.
- PR #35 remains draft and unmerged: https://github.com/TrendforgeHQ/Trendforgehq.github.io/pull/35.

### Exact next actions
1. Inspect the actual BOAT offline workflow run and logs. Do not infer pass from file presence or a missing run.
2. If tests fail, fix the smallest underlying issue on the BOAT branch, rerun, and record command/exit code/commit.
3. Review the Run 405 durable reconstruction test on PR #34. The original evidence-pack artifact expired and the committed archived pack is empty; the reconstruction must be described as a new deterministic regression fixture, not an exact historical replay.
4. If reconstructed calibration is not 11 supported / 2 partial / 2 unsupported, preserve the failure and investigate; do not weaken expected results just to make CI green.
5. Strengthen the report schema and validate it against real Article Doctor output after the regression suite is runnable.
6. Update `PROJECT_STATE.md`, `CHANGELOG.md`, and `LEARNINGS.md` with actual run IDs, test results, commit SHAs, and unresolved gaps.

### Guardrails
- No paid providers, external source fetches, article edits, publishing workflow runs, image generation, or production gate changes for this phase.
- Do not change `main`; do not merge PR #34 or #35 without reviewing their exact diffs and required checks.
- Existing evidence, claim-verification, editorial, image-safety, and build gates remain authoritative.
- BOAT remains read-only. No repair, publish, merge, secret, or policy-threshold action is authorized.
