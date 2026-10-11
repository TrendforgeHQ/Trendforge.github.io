# BOAT — Canonical Project State

**Last updated:** 2026-10-11  
**State version:** 0.1.0  
**Current phase:** Phase 0 — Blueprint and baseline documentation  
**Status:** In progress; documentation branch created; PR status recorded in repository history when opened.

## Mission
Create a reliable, evidence-grounded, self-improving editorial operations bot for TrendForge with controlled permissions, article auditing, editorial benchmarking, urgent-topic prioritization, and durable project memory.

## Verified repository baseline
- Repository: `TrendforgeHQ/Trendforgehq.github.io`
- Default branch: `main`
- Existing Control Center route: `app/control-center/page.tsx`
- Control Center is statically exported and reads committed data snapshots at build time; it is not currently a live privileged chat/action backend.
- Existing Supervisor: `scripts/trendforge-supervisor.mjs`, output mode `advisory-observational`; its policy says it does not influence decisions or change evidence/claim/safety/publication gates.
- Existing Self-Learning: `scripts/trendforge-self-learning.mjs`, mode `shadow`; aggregates historical run metrics/signals and does not currently implement full claim-level editorial learning.
- Existing audit/memory assets include `scripts/trendforge-memory.mjs`, `scripts/trendforge-audit-trail.mjs`, `data/decision-log.jsonl`, and `data/trendforge-memory.json`.
- Publishing workflow: `.github/workflows/publish.yml`; scheduled every six hours and manually dispatchable. Current declaration has no topic/article input. The workflow includes source/evidence checks, claim verification and bounded repair/re-verification, editorial quality, image safety, and build/release steps.
- Several unrelated PRs are already open. BOAT changes must stay isolated and must not disturb them.

## Current BOAT implementation
- Runtime: not implemented.
- Chat backend: not implemented.
- Approval gateway/button: not implemented.
- Article Doctor: not implemented.
- Claim-level article audit: not implemented as a BOAT module.
- Human-article benchmark lab: not implemented as a BOAT module.
- Priority queue / targeted dispatch: not implemented.
- Persistent BOAT event schema: proposed only.
- Blueprint and documentation: being established in this phase.

## Hard constraints
1. Do not directly commit changes to `main`.
2. Use a dedicated branch and PR; do not merge automatically.
3. Do not change production publishing behavior in Phase 0.
4. Do not bypass or weaken any evidence, claim, editorial, image-safety, or build gate.
5. Do not make paid provider calls merely to write documentation or diagnose a saved artifact.
6. Do not expose GitHub tokens/secrets in browser code or committed files.
7. Record every material action, result, and decision in this project folder.
8. Mark unverified claims as unknown; never invent successful tests or workflow outcomes.

## Phase ledger
| Phase | Goal | Status |
|---|---|---|
| 0 | Blueprint, baseline audit, durable project records | In progress |
| 1 | Read-only artifact collection and Article Doctor report | Not started |
| 2 | Claim/source audit and editorial benchmark evaluation | Not started |
| 3 | Fixture-backed repair proposals and regression harness | Not started |
| 4 | Secure approval gateway and Control Center workspace | Not started |
| 5 | Quota-aware priority queue and targeted workflow dispatch | Not started |
| 6 | Limited, measured, approval-bounded autonomy | Not started |

## Current verified progress
- Repository and relevant existing modules inspected.
- Existing static Control Center, shadow learning, advisory supervisor, and six-hour publishing cadence documented.
- Blueprint and baseline records drafted for review.
- No production code or publishing logic changed as part of the blueprint phase.
- Automated tests have not been run for documentation-only changes unless a later log explicitly records them.

## Next task
Follow [NEXT_STEP.md](NEXT_STEP.md). Do not start runtime changes until Phase 0 documentation is reviewed and the read-only interface map is completed.
