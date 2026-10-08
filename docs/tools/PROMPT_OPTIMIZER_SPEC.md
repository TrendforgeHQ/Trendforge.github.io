# Prompt Optimizer — Design Specification

Status: **Designing — not implemented**

## Goal
Help users improve prompts through transparent, deterministic checks without an AI API, account, backend, or server-side processing.

## Core input
- Free-form prompt text.
- Optional task type, output format, audience, tone, and constraints.
- Optional fields remain optional.

## Core analysis
Local checks may flag:
- unclear objective;
- missing context;
- ambiguous instructions;
- missing output format/audience;
- conflicting requirements;
- vague quality language;
- missing constraints;
- repetition;
- excessive/unstructured length;
- missing examples where examples would materially clarify the task.

Findings are suggestions, not claims of perfect intent understanding.

## Output
1. Transparent heuristic score (not an AI quality measurement).
2. Specific improvement suggestions with reasons.
3. Suggested structure derived only from user-provided information.
4. Deterministic improved prompt that preserves user intent and does not invent facts, rules, credentials, URLs, or sensitive assumptions.

## Explicit non-goals
The first version will NOT:
- call OpenAI, Gemini, Groq, OpenRouter, Cohere, or another model API;
- send prompt text to third parties;
- store prompt text on TrendForge servers;
- require login/database;
- modify articles or read editorial artifacts;
- trigger GitHub Actions;
- interact with evidence, claim verification, image generation, or publication scripts.

## Privacy
Prompt text stays in the browser during normal use. Initial version uses no persistent storage.

## UX
Desktop: prompt editor + analysis/result.
Mobile: editor → analysis → improved prompt.
Actions: Analyze, Copy improved prompt, Reset.
No intrusive signup wall or popup.

## Quality rule
Prefer useful suggestions over a high score. A short, already-good prompt may receive few or no suggestions.

## Test strategy
Cover empty, clear, vague, contextual, formatted, conflicting, repeated, long, code/JSON, sensitive-looking, Unicode/non-English, mobile-sized input, copy and reset behavior.

## Isolation test
No import/runtime dependency on article generation, evidence, claim verification, writer/provider routing, repair, image generation, or publication workflows. The tool must run from browser-side deterministic functions alone.

## Build gate
Do not mark Building until design approval, isolated implementation, tests, production build, manual UX, SEO/privacy review, pipeline-isolation check, and documentation updates all pass.
