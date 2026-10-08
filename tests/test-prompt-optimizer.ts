import assert from "node:assert/strict";
import { optimizePrompt } from "../app/tools/ai/prompt-optimizer/optimizer";

const empty = optimizePrompt("");
assert.equal(empty.score, 0);
assert.equal(empty.improvedPrompt, "");

const clear = optimizePrompt("Write a three-bullet summary of this text.");
assert.ok(clear.score >= 0 && clear.score <= 100);
assert.ok(clear.improvedPrompt.length > 0);
assert.equal(clear.findings.some((f) => f.id === "objective"), false);

const vague = optimizePrompt("Make this good.");
assert.ok(vague.findings.length > 0);
assert.match(vague.improvedPrompt, /Task:/);

const unicode = optimizePrompt("इस पाठ का सारांश तीन बुलेट में लिखें।");
assert.ok(unicode.improvedPrompt.length > 0);

const structured = optimizePrompt("Compare these two APIs and return a markdown table.");
assert.equal(structured.findings.some((f) => f.id === "format"), false);

console.log("Prompt Optimizer tests passed.");
