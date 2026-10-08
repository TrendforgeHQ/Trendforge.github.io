# TrendForge Tools — Architecture Decisions

## ADR-001: Tools live inside TrendForge

**Decision:** Build the Tools ecosystem inside `Trendforgehq.github.io`.

**Reason:** The goal is to add utility to the existing publication, improve visitor retention, create article/tool relationships, and keep one site/brand.

**Rejected:** Separate tools website/repository.

## ADR-002: Browser-first

**Decision:** Browser execution is the default for tools that can safely operate locally.

**Reason:** Zero infrastructure cost, lower latency, and better privacy.

## ADR-003: Static-compatible

**Decision:** Tool implementation must remain compatible with the current Next.js static-export deployment unless a specific tool proves otherwise.

**Reason:** Avoid introducing backend infrastructure and preserve the existing deployment model.

## ADR-004: Isolated from editorial automation

**Decision:** Tools must not be coupled to the article-generation pipeline.

**Reason:** Prevent regressions and unnecessary provider/quota usage.

## ADR-005: Tool pages are content pages

**Decision:** A production tool page includes useful explanation, examples, privacy information and related content, not only the interactive widget.

**Reason:** Better usability, discoverability and long-term value.

## ADR-006: Integrate with existing app structure

**Decision:** Tools will use the existing Next.js `app/` routing model, centralized styling system, and existing SEO helpers.

**Reason:** Keep Tools native to TrendForge without introducing a second frontend system.

## ADR-007: Proposed Tool URL hierarchy

**Decision:** Reserve:
- `/tools/` — Tools hub
- `/tools/ai/` — AI tools
- `/tools/developer/` — Developer tools
- `/tools/saas/` — SaaS / Business tools
- `/tools/<category>/<slug>/` — individual tools

**Reason:** Clear hierarchy for users, internal links and search engines, compatible with the current root GitHub Pages deployment.

## ADR-008: Navigation integration

**Decision:** Add Tools to the existing TrendForge primary navigation rather than creating a second site-wide navigation system.

**Reason:** Minimize scope and preserve the current visual/navigation model.

## ADR-009: Styling strategy

**Decision:** Reuse existing visual primitives and centralized `app/globals.css`; add Tool-specific classes only where necessary.

**Reason:** The current site already has responsive, focus-visible and reduced-motion patterns.

## ADR-010: Runtime boundary

**Decision:** Keep tool computation client-side where practical and do not modify the editorial pipeline, monetization loader, or global layout for tool-specific logic.

**Reason:** Preserve zero-cost/privacy-first behavior and reduce regression/quota risk.

## ADR-011: Hard publishing-pipeline firewall

**Decision:** Tools and editorial publishing are separate dependency domains.

**Allowed dependency direction:**
`site shell / shared safe UI` → `Tools`
`site shell / shared safe UI` → `Editorial`

**Forbidden dependency direction:**
`Tools` → `Editorial pipeline`

Tools cannot import, invoke, trigger, or require article generation, evidence collection, claim verification, writer/provider routing, repair, image generation, or publication automation.

**Trigger rule:** Tool commits must not add workflow triggers capable of starting the publishing pipeline.

**Failure isolation:** A failure in Tools must not block publication, and a failure in publication must not block Tools.

**Removal test:** The publishing pipeline must remain buildable and conceptually independent if the entire `app/tools` area is removed.
