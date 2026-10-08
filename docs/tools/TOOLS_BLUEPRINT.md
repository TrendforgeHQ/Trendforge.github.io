# TrendForge Tools — Blueprint

## 1. Product concept

TrendForge will become:

**Technology publication + practical tools platform**

The Tools section will live under the same TrendForge domain and navigation.

Suggested route:

`/tools/`

Category routes:

- `/tools/ai/`
- `/tools/developer/`
- `/tools/saas/`

Individual tool routes should be stable, descriptive and lowercase, for example:

- `/tools/ai/prompt-optimizer/`
- `/tools/developer/jwt-inspector/`
- `/tools/saas/saas-pricing-calculator/`

## 2. Tool page blueprint

Each production tool page should normally contain:

1. Tool title
2. One-line value proposition
3. Working tool interface
4. Clear inputs and outputs
5. Reset/copy/export controls where relevant
6. Short explanation
7. How it works
8. Example
9. Privacy / processing disclosure
10. Limitations
11. Related tools
12. Relevant TrendForge articles
13. FAQ where genuinely useful

## 3. Tools index

The Tools landing page should provide:
- search;
- category filters;
- tool cards;
- free/open-source/browser-only badges where accurate;
- concise descriptions;
- links to individual tools.

Do not build a giant directory merely for quantity.

## 4. Architecture direction

Prefer:

Browser UI
-> deterministic TypeScript logic
-> local result

over:

Browser
-> TrendForge backend
-> third-party API

when the task can be completed locally.

Potential shared modules:
- tool metadata;
- validation;
- copy/download helpers;
- SEO helpers;
- privacy labels;
- tool category definitions.

## 5. SEO

Each useful tool should be a first-class indexable page with:
- title;
- description;
- canonical URL;
- Open Graph metadata;
- breadcrumbs;
- appropriate structured data where valid;
- internal links;
- related tools.

Do not create thin pages that contain only an input box.

## 6. Retention model

Articles can naturally link to tools.

Example:

Article about RAG
-> RAG Chunking Calculator
-> Token/Context Calculator
-> LLM Cost Calculator

Tool pages can link back to:
- relevant TrendForge articles;
- related tools;
- category pages.

## 7. Technology constraints

Initial implementation should fit the existing Next.js static-export architecture.

Do not introduce a server/database just because a tool could use one.

## 8. Independence from editorial pipeline

Tools must not modify:
- evidence generation;
- claim verification;
- writer pipeline;
- article publication workflow;
- image generation.

Tool builds must also avoid unnecessary workflow triggers and provider quota consumption.
