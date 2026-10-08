# TrendForge Tools — Project State

Last updated: 2026-10-08

## Mission

Add a high-value Tools ecosystem **inside the existing TrendForge site**. This is not a separate website and not a separate repository.

The Tools area exists to:
- give TrendForge visitors practical utility;
- increase repeat visits and time spent on the site;
- create useful internal links between articles and tools;
- build proprietary, genuinely useful tools rather than a generic tool directory.

## Current phase

**Phase 0 — Foundation / Blueprint**

Status: IN PROGRESS — architecture gate complete; documentation gate pending

No production tools have been added yet.

## Verified existing-site baseline

Inspected the current `main` branch before tool implementation:
- Next.js static export (`output: 'export'`).
- Root GitHub Pages deployment uses an empty `basePath` by default.
- Canonical site URL is `https://trendforgehq.github.io`.
- Existing global layout is the main integration point for site-wide UI/metadata.
- Existing homepage navigation is currently defined directly in `app/page.tsx`.
- Existing Pages deployment builds and validates the static `out/` artifact.
- Existing deployment workflow also runs on selected successful upstream workflow completions; tool work must not introduce additional expensive triggers.

These findings are recorded as architecture inputs only. No production code was changed during Phase 0.

## Current repository

- Repository: `TrendforgeHQ/Trendforgehq.github.io`
- Production site: `https://trendforgehq.github.io/`
- Default branch: `main`
- Foundation branch: `docs/tools-foundation-v2`

## First implementation rule

Do not start coding a production tool until the blueprint, roadmap, architecture and permanent rules are documented and reviewed.

## Planned top-level categories

1. AI Tools
2. Developer Tools
3. SaaS / Business Tools

## Zero-cost direction

Prefer tools that can run entirely in the browser or with static-site computation:
- no database;
- no dedicated backend;
- no paid API;
- no server-side processing unless there is a strong reason;
- no mandatory login;
- no unnecessary external infrastructure.

AI-powered features that require paid model APIs are not part of the zero-cost core. Where possible, first versions should use deterministic/browser-side logic, with optional BYO API-key integrations only if later justified.

## Product standard

A tool should solve a real problem and be materially more useful than a generic commodity converter. Every tool should have:
- clear purpose;
- practical input/output;
- privacy explanation;
- usage example;
- SEO metadata;
- related tools;
- testing/validation;
- documented cost model.

## Safety boundary

The Tools work must remain isolated from TrendForge's article-generation/publishing pipeline. Adding or changing tools must not trigger expensive article-generation or image-generation workflows.

## Phase 0 architecture inspection — completed

Inspected current `main` before production implementation:
- Route pages are colocated under `app/`, with article pages under `app/article/[slug]/` and dedicated pages such as `search`, `about`, `subscribe`, and `monetization`.
- `app/page.tsx` owns primary navigation; there is currently no Tools route or navigation.
- `app/layout.tsx` is the global metadata/security/JSON-LD/monetization integration point and should not receive tool-specific runtime logic.
- `app/globals.css` is the central styling layer and already contains responsive, focus-visible and reduced-motion patterns.
- Interactive features use client components under `app/components/`; tool computation should be client-side only when interactivity requires it.
- The static root-site model supports Tool URLs such as `/tools/` and `/tools/<category>/<slug>/`.
- `lib/seo.ts` provides the existing canonical URL and metadata conventions; Tools should extend these rather than create a parallel SEO system.

## Integration boundary

The first Tools implementation will be additive: establish the Tools route structure, add only necessary reusable UI, integrate navigation deliberately, and keep article generation, evidence, image generation and monetization workflows unchanged.

No production code has been changed during this inspection.

## Phase 0 gate — architecture locked

The publishing-pipeline firewall is now a permanent rule. Tools cannot import, invoke, trigger or depend on editorial generation, evidence, claim verification, writer/provider routing, repair, image generation or publication automation.

The first Phase 1 tool selected for **designing** is **Prompt Optimizer**. It is not being built yet.

## Next step

Complete the Phase 0 documentation review, then design and test Prompt Optimizer before any production Tool UI is added.


## Phase 1 — Prompt Optimizer design

Design specification created at `docs/tools/PROMPT_OPTIMIZER_SPEC.md`. Status remains **Designing**; no production Tool code has been added. The design explicitly forbids model APIs, persistence, backend processing and every publishing-pipeline dependency.


## Prompt Optimizer MVP implementation

Implemented on `feat/prompt-optimizer-mvp`: browser-only deterministic optimizer engine, isolated route/UI, focused tests, and a publishing-pipeline isolation guard. No workflow files or editorial pipeline code were changed. The tool remains isolated and is not yet marked Ready.


## Verification gate — 2026-10-08

- Clean branch checkout verified with `npm install`.
- Prompt Optimizer tests: **PASS**.
- Publishing-pipeline isolation guard: **PASS**.
- Production `next build`: **PASS**.
- Static export generated successfully, including `/tools/ai/prompt-optimizer`.
- Build emitted existing Autoprefixer warnings in `RelatedStories.module.css` and `globals.css`; these are pre-existing site styling warnings and are unrelated to the Tool implementation.
- No workflow files were changed by the Tool branch.
- Status remains **Building** pending UI/SEO review and final PR review.


## 2026-10-08 — UI, SEO and navigation gate

- Prompt Optimizer UI reviewed and polished with dedicated responsive tool styling.
- Added explicit privacy/browser-only messaging and transparent deterministic-tool explanation.
- Added improved accessibility structure for input, analysis and output regions.
- Added canonical metadata for Prompt Optimizer.
- Added `/tools/` hub and `/tools/ai/` category landing page.
- Added Tools entry to the main TrendForge homepage navigation.
- Unreleased category hubs are not linked until they actually exist.
- Verification after integration: Prompt Optimizer tests **PASS**, isolation guard **PASS**, production build **PASS**; 71 static pages generated.
- No publishing workflow changes.
- Status remains **Building** until final PR review/merge decision.

## 2026-10-08 — Phase 1 AI suite implementation

Phase 1 is now **BUILDING — first-wave suite implemented; validation pending**.

Implemented:
1. Prompt Optimizer
2. Prompt Comparator
3. LLM Cost Calculator
4. Token & Context Calculator
5. RAG Chunking Calculator

All five use deterministic browser-side logic. No model API, login, database, prompt persistence, backend, or workflow trigger was introduced.

The AI Tools landing page now exposes all five utilities. Shared AI styling was added without modifying the global layout or editorial pipeline.

Validation required before release:
- AI suite tests;
- publishing-pipeline isolation guard;
- production build;
- manual UX review;
- SEO/privacy review;
- documentation review.


## 2026-10-08 — Phase 3 SaaS & Business suite implementation

Implemented all eight first-wave SaaS/business calculators in one isolated batch:
1. SaaS Pricing Calculator
2. MRR Calculator
3. ARR Calculator
4. Churn Calculator
5. LTV Calculator
6. CAC Calculator
7. SaaS Break-even Calculator
8. Revenue Forecast Calculator

The suite uses deterministic browser-side formulas. No model API, account, database, backend, or workflow trigger was added. Inputs remain user assumptions and outputs are clearly framed as estimates/scenarios rather than financial advice.

Validation required before release: SaaS tests, publishing-pipeline isolation guard, production build, manual UX review, SEO/privacy review, regression check and documentation review.
