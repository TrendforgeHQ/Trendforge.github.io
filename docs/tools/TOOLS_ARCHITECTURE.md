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
