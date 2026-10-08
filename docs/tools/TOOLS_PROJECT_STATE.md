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

Status: IN PROGRESS

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
- Foundation branch: `docs/tools-foundation`

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

## Next step

Complete Phase 0 documentation and architecture review, then select the first tool using the criteria in `TOOLS_ROADMAP.md`.
