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
