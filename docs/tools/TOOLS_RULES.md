# TrendForge Tools — Permanent Rules

## Rule 1 — Same TrendForge site

Tools are part of TrendForge.

**Never create a separate tools website or separate tools repository unless the project owner explicitly changes this decision.**

## Rule 2 — Zero-cost first

Prefer:
- browser-side processing;
- static computation;
- open-source libraries;
- existing project infrastructure.

Avoid paid APIs and paid infrastructure unless explicitly approved.

## Rule 3 — No fake AI

Do not call a deterministic utility an "AI tool" merely for marketing.

If a tool does not use an AI model, describe what it actually does.

## Rule 4 — No generic filler

Do not add common, easily available commodity tools merely to increase the tool count.

Each tool must have a clear user problem and a reason to exist on TrendForge.

## Rule 5 — Privacy by default

If input can remain in the browser, keep it there.

Never send user input to a third party without a clear reason and disclosure.

## Rule 6 — No unnecessary backend

Static/browser architecture is the default.

A backend needs an explicit technical justification.

## Rule 7 — No mandatory account

Tools should work without login unless a future feature genuinely requires accounts.

## Rule 8 — Protect the article pipeline

Tools must remain isolated from:
- article generation;
- evidence gathering;
- claim verification;
- image generation;
- publication workflows.

No accidental expensive workflow triggers.

## Rule 9 — Main branch safety

Use a dedicated branch for tool work. Do not make risky direct changes to `main`.

## Rule 10 — Staged implementation

Build small batches. Test each batch before adding more tools.

## Rule 11 — No guessing

Inspect existing code before modifying it. If architecture or behavior is unknown, verify it first.

## Rule 12 — Documentation is part of the product

Every major decision must be recorded in the Tools documentation so future work can resume without depending on chat history.

## Rule 13 — Quality over quantity

Ten genuinely useful tools are better than one hundred thin tools.

## Rule 14 — No forced monetization

Do not damage usability with excessive ads, popups or intrusive monetization.

Monetization must come after utility and user experience.

## Rule 15 — Every tool needs a lifecycle

Track:
- planned;
- designing;
- building;
- testing;
- ready;
- live;
- needs-fix;
- retired.

## Rule 16 — No phase skipping

Do not start later phases while required Phase 0 documentation and gates are incomplete.

## Rule 17 — Hard publishing-pipeline firewall

The Tools ecosystem has **no connection** to the editorial publishing pipeline.

Tools must NOT:
- import article-generation, evidence, claim-verification, writer, image-generation, provider-routing, repair, or publication modules;
- call editorial scripts or workflows;
- modify editorial workflow triggers;
- add `workflow_run`, scheduled, repository-dispatch, or other triggers that can start publishing work;
- consume article-generation/provider quotas;
- depend on article-generation artifacts to function;
- make tool usage capable of starting or re-running publication workflows.

Article publishing must continue to work if the entire Tools area is removed. Tools must continue to work if the editorial pipeline is unavailable.

Any future exception requires an explicit architecture decision before implementation.
