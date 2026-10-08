# TrendForge Tools — Zero-Cost Policy

## Goal

Build the core Tools ecosystem without recurring infrastructure/API spend.

## Preferred stack

- Existing Next.js application
- TypeScript
- React
- Browser APIs
- Static assets
- Open-source packages already compatible with the project

## Preferred execution model

User input
-> browser
-> local TypeScript function
-> result

## Allowed by default

- deterministic calculations;
- parsers;
- formatters;
- validators;
- diff tools;
- local transformations;
- client-side analysis;
- browser storage when genuinely useful.

## Requires explicit review

- paid AI APIs;
- third-party API calls;
- serverless functions;
- databases;
- queues;
- external SaaS dependencies;
- services with usage-based billing.

## AI rule

An AI model is not required simply because a tool is in the AI category.

First build useful deterministic functionality where possible.

Optional BYO API-key support may be considered later, provided:
- the key stays client-side;
- the provider is called directly where technically appropriate;
- the user is clearly informed;
- TrendForge does not absorb the API bill.

## Cost review

Before adding a dependency ask:
1. Is it necessary?
2. Can browser APIs do it?
3. Can existing dependencies do it?
4. Is there an open-source alternative?
5. Does it introduce recurring cost?
6. Does it create a new failure point?

If the answer is uncertain, stop and inspect before implementing.
