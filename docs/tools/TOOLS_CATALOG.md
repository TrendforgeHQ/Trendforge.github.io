# TrendForge Tools — Catalog

Status values: Planned / Designing / Building / Testing / Ready / Live / Needs-fix / Retired

## Phase 1 — AI

| Tool | Status | Zero-cost core | Notes |
|---|---|---|---|
| Prompt Optimizer | **Designing** | Yes | **Phase 1 first-tool candidate**; rule-based prompt improvement first |
| Prompt Comparator | Planned | Yes | Compare prompts structurally |
| LLM Cost Calculator | Planned | Yes | Local calculation from model pricing inputs |
| Token / Context Calculator | Planned | Yes | Model-aware estimation where possible |
| RAG Chunking Calculator | Planned | Yes | Chunk/overlap calculation and guidance |

## Phase 2 — Developer

| Tool | Status | Zero-cost core | Notes |
|---|---|---|---|
| JWT Inspector | Planned | Yes | Decode/inspect locally; never imply signature verification without a key |
| Webhook Tester | Planned | TBD | Architecture review required |
| API Request Builder | Planned | Yes | Browser-side request construction |
| cURL to Code | Planned | Yes | Local parsing/generation |
| JSON to TypeScript | Planned | Yes | Local transformation |
| JSON Schema Generator | Planned | Yes | Local generation |
| API Response Diff | Planned | Yes | Local comparison |
| Regex Playground | Planned | Yes | Local regex execution with safety limits |
| OpenAPI Validator | Planned | Yes | Browser-side validation |
| HTTP Headers Analyzer | Planned | Yes | Local analysis of pasted headers |

## Phase 3 — SaaS

| Tool | Status | Zero-cost core | Notes |
|---|---|---|---|
| SaaS Pricing Calculator | Planned | Yes | Pricing scenarios |
| MRR Calculator | Planned | Yes | Local calculation |
| ARR Calculator | Planned | Yes | Local calculation |
| Churn Calculator | Planned | Yes | Local calculation |
| LTV Calculator | Planned | Yes | Assumption-driven |
| CAC Calculator | Planned | Yes | Local calculation |
| SaaS Break-even Calculator | Planned | Yes | Local calculation |
| Revenue Forecast Calculator | Planned | Yes | Local scenario modelling |

## Selection rule

The catalog is a candidate list, not a promise that every item will ship.

A tool enters Building only after design review and explicit phase approval.

## 2026-10-08 — Phase 1 AI suite

| Tool | Status | Zero-cost core | Notes |
|---|---|---|---|
| Prompt Optimizer | **Building** | Yes | Deterministic browser-side prompt checks |
| Prompt Comparator | **Building** | Yes | Structural comparison of two prompts |
| LLM Cost Calculator | **Building** | Yes | Editable pricing assumptions; no hard-coded provider dependency |
| Token / Context Calculator | **Building** | Yes | Approximate token and context planning |
| RAG Chunking Calculator | **Building** | Yes | Chunk count and overlap planning |


## 2026-10-08 — Phase 3 SaaS & Business suite

| Tool | Status | Zero-cost core | Notes |
|---|---|---|---|
| SaaS Pricing Calculator | **Building** | Yes | Browser-side pricing scenario model |
| MRR Calculator | **Building** | Yes | Monthly recurring revenue movements |
| ARR Calculator | **Building** | Yes | MRR-to-ARR run rate |
| Churn Calculator | **Building** | Yes | Customer churn and retention |
| LTV Calculator | **Building** | Yes | ARPA, gross margin and churn assumptions |
| CAC Calculator | **Building** | Yes | Sales and marketing spend model |
| SaaS Break-even Calculator | **Building** | Yes | Contribution-margin break-even model |
| Revenue Forecast Calculator | **Building** | Yes | Simple compounded growth scenario |
