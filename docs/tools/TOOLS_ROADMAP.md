# TrendForge Tools — Roadmap

## Phase 0 — Foundation

Status: **IN PROGRESS — architecture gate complete; final documentation gate pending**

Deliverables:
- [x] Project state document
- [x] Blueprint
- [x] Permanent rules
- [x] Zero-cost policy
- [x] Tool catalog
- [x] Architecture decision record
- [ ] Phase completion review

No production tool in this phase.

## Phase 1 — AI Utility Core

**First tool selected for design: Prompt Optimizer.**

Why first:
- can be genuinely useful without an AI API;
- can run fully in-browser;
- can demonstrate the Tools architecture with low operational risk;
- has clear input → analysis → improved-output behavior;
- can later support optional advanced modes without making paid AI a core dependency.

It remains **Designing**, not Building, until its UX, rule set, tests, SEO content and isolation checks are approved.

Target: first small, high-value browser-side tools.

Candidate set:
1. Prompt Optimizer
2. Prompt Comparator
3. LLM Cost Calculator
4. Token / Context Calculator
5. RAG Chunking Calculator

Selection criteria:
- zero-cost core;
- deterministic where possible;
- useful to real AI users;
- easy to test;
- strong relationship with other tools;
- meaningful SEO intent.

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

Potential areas:
- AI evaluation;
- RAG testing;
- prompt-injection testing;
- API debugging;
- security configuration analysis;
- local/private data utilities.

These require a separate feasibility review before implementation.

## Phase 5 — Optimization

Only after useful tools exist:
- analytics;
- tool usage insights;
- better discovery;
- article-to-tool recommendations;
- tool-to-tool recommendations;
- performance improvements;
- accessibility improvements;
- SEO refinement.

## Phase gate

A phase is not complete because code exists.

A phase is complete only after:
1. implementation;
2. tests;
3. production build;
4. manual functional review;
5. SEO review;
6. privacy review;
7. regression check;
8. documentation update;
9. Project State update.
