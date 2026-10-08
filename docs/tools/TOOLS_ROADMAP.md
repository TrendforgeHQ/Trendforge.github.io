# TrendForge Tools — Roadmap

## Phase 0 — Foundation

Status: **COMPLETE — documentation and architecture gate passed**

## Phase 1 — AI Utility Core

Status: **BUILDING — all five first-wave tools implemented in one batch**

1. Prompt Optimizer
2. Prompt Comparator
3. LLM Cost Calculator
4. Token / Context Calculator
5. RAG Chunking Calculator

Shared design:
- browser-side deterministic logic;
- no paid model/API dependency;
- editable assumptions where provider data changes;
- no login, database or prompt persistence;
- static-export compatible.

Phase gate:
1. focused tests;
2. publishing-pipeline isolation check;
3. production Next.js build;
4. manual UX review;
5. SEO/privacy review;
6. documentation and Project State update;
7. only then mark the batch Ready/Live.

## Phase 2 — Developer Core

Candidate set:
1. JWT Inspector
2. Webhook Tester
3. API Request Builder
4. cURL to Code Converter
5. JSON to TypeScript
6. JSON Schema Generator
7. API Response Diff
8. Regex Playground
9. OpenAPI Validator
10. HTTP Headers Analyzer

## Phase 3 — SaaS / Business

Candidate set:
1. SaaS Pricing Calculator
2. MRR Calculator
3. ARR Calculator
4. Churn Calculator
5. LTV Calculator
6. CAC Calculator
7. SaaS Break-even Calculator
8. Revenue Forecast Calculator

## Phase 4 — Advanced

Potential areas: AI evaluation, RAG testing, prompt-injection testing, API debugging, security configuration analysis, local/private data utilities.

## Phase 5 — Optimization

Only after useful tools exist: analytics, tool usage insights, better discovery, article-to-tool recommendations, tool-to-tool recommendations, performance, accessibility and SEO refinement.
