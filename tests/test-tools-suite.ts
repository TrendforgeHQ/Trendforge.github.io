import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { optimizePrompt } from "../app/tools/ai/prompt-optimizer/optimizer";
import { comparePrompts } from "../app/tools/ai/prompt-comparator/comparator";
import { calculateLLMCost } from "../app/tools/ai/llm-cost-calculator/calculator";
import { estimateTokenContext } from "../app/tools/ai/token-context-calculator/calculator";
import { calculateRAGChunks } from "../app/tools/ai/rag-chunking-calculator/calculator";
import { decodeJwt, jsonDiff, jsonToTs, generateSchema, regexTest, analyzeHeaders, curlToCode, validateOpenApi } from "../app/tools/developer/toolkit";
import { pricing, mrr, arr, churn, ltv, cac, breakeven, forecast } from "../app/tools/saas/calculators";

const root = process.cwd();
const expect = (condition: unknown, message: string) => assert.ok(condition, message);

const prompt = optimizePrompt("Make this good.");
assert.equal(prompt.score, 70);
expect(prompt.findings.length >= 2, "Prompt Optimizer should flag vague prompts.");
expect(optimizePrompt("Compare these APIs and return a markdown table.").findings.every((f) => f.id !== "format"), "Prompt Optimizer format check failed.");

const comparison = comparePrompts("Write a summary.", "Write a three-bullet summary of this report.");
expect(comparison.leftScore >= 0 && comparison.leftScore <= 100, "Prompt Comparator left score out of range.");
expect(comparison.rightScore >= 0 && comparison.rightScore <= 100, "Prompt Comparator right score out of range.");
expect(comparison.rightWords > 0 && comparison.differences.length > 0, "Prompt Comparator did not produce comparison data.");

const cost = calculateLLMCost({ inputTokens: 1000, outputTokens: 500, requests: 1000, inputPrice: 1, outputPrice: 2 });
assert.equal(cost.perRequest, 0.002);
assert.equal(cost.monthly, 2);
assert.equal(calculateLLMCost({ inputTokens: -1, outputTokens: -1, requests: -1, inputPrice: -1, outputPrice: -1 }).monthly, 0);

const context = estimateTokenContext({ text: "a".repeat(400), charsPerToken: 4, contextWindow: 200, reservedOutput: 50 });
assert.equal(context.estimatedTokens, 100);
assert.equal(context.availableInput, 150);
assert.equal(context.remaining, 50);
assert.equal(estimateTokenContext({ text: "", charsPerToken: 0, contextWindow: 0, reservedOutput: 999 }).estimatedTokens, 0);

const rag = calculateRAGChunks({ text: "a".repeat(4000), chunkSize: 500, overlap: 100, charsPerToken: 4 });
assert.equal(rag.tokens, 1000);
assert.equal(rag.chunks, 3);
assert.equal(rag.lastChunkTokens, 200);
assert.equal(calculateRAGChunks({ text: "", chunkSize: 500, overlap: 100, charsPerToken: 4 }).chunks, 0);

const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
const payload = Buffer.from(JSON.stringify({ sub: "123", exp: 4102444800 })).toString("base64url");
const jwt = decodeJwt(header + "." + payload + ".signature");
assert.equal(jwt.payload.sub, "123");
assert.equal(jwt.expired, false);
assert.equal(jwt.hasExpiry, true);

const diff = jsonDiff('{"a":1,"remove":true}', '{"a":2,"add":true}');
assert.deepEqual(diff.changed, ["root.a"]);
assert.deepEqual(diff.added, ["root.add"]);
assert.deepEqual(diff.removed, ["root.remove"]);

expect(jsonToTs('{"name":"x","active":true}').includes("interface Root"), "JSON → TypeScript failed.");
expect(jsonToTs('{"name":"x","active":true}').includes("active"), "JSON → TypeScript lost a property.");
expect(generateSchema('{"ok":true}').includes("draft/2020-12"), "JSON Schema generator missing schema version.");
assert.equal(regexTest("cat", "g", "cat dog cat").length, 2);
assert.equal(analyzeHeaders("Content-Type: application/json").headers["content-type"], "application/json");
assert.equal(validateOpenApi('{"openapi":"3.0.0","info":{},"paths":{}}').valid, true);
assert.equal(validateOpenApi('{"openapi":"3.0.0","paths":{"bad":{}}}').valid, false);
assert.equal(curlToCode("curl -X POST -H 'Content-Type: application/json' -d '{"ok":true}' https://example.com").method, "POST");

assert.equal(pricing(100, 20, 25).metrics[2].value, "$500.00");
assert.equal(mrr(1000, 200, 100, 100).metrics[0].value, "$1000.00");
assert.equal(arr(10000).metrics[0].value, "$120000.00");
assert.equal(churn(100, 5).metrics[0].value, "5.00%");
assert.equal(ltv(50, 80, 2).metrics[1].value, "$2000.00");
assert.equal(cac(5000, 100).metrics[0].value, "$50.00");
assert.equal(breakeven(10000, 100, 20).metrics[1].value, "125");
assert.equal(forecast(10000, 10, 2).metrics[0].value, "$12100.00");
assert.equal(breakeven(10000, 20, 20).metrics[1].value, "0");

const routes = [
  "/tools/ai/prompt-optimizer/",
  "/tools/ai/prompt-comparator/",
  "/tools/ai/llm-cost-calculator/",
  "/tools/ai/token-context-calculator/",
  "/tools/ai/rag-chunking-calculator/",
  "/tools/developer/jwt-inspector/",
  "/tools/developer/webhook-tester/",
  "/tools/developer/api-request-builder/",
  "/tools/developer/curl-to-code/",
  "/tools/developer/json-to-typescript/",
  "/tools/developer/json-schema-generator/",
  "/tools/developer/api-response-diff/",
  "/tools/developer/regex-playground/",
  "/tools/developer/openapi-validator/",
  "/tools/developer/http-headers-analyzer/",
  "/tools/saas/pricing-calculator/",
  "/tools/saas/mrr-calculator/",
  "/tools/saas/arr-calculator/",
  "/tools/saas/churn-calculator/",
  "/tools/saas/ltv-calculator/",
  "/tools/saas/cac-calculator/",
  "/tools/saas/break-even-calculator/",
  "/tools/saas/revenue-forecast-calculator/",
];

for (const route of routes) {
  const page = path.join(root, "app", route.replace(/^\/|\/$/g, ""), "page.tsx");
  expect(fs.existsSync(page), `Missing route page: ${route}`);
  const source = fs.readFileSync(page, "utf8");
  expect(source.includes("metadata"), `Missing metadata export: ${route}`);
  expect(source.includes("alternates"), `Missing canonical metadata: ${route}`);
}

const developerSource = fs.readFileSync(path.join(root, "app/tools/developer/DeveloperTool.tsx"), "utf8");
expect(developerSource.includes('kind==="webhook"||kind==="request"'), "Developer network tools no longer use the guarded request path.");
expect(developerSource.includes("await fetch(url"), "Developer request execution path missing.");
expect(developerSource.includes("Local transforms stay in your browser."), "Developer privacy messaging missing.");

const forbidden = [
  "article-generation",
  "evidence",
  "claim-verification",
  "writer",
  "provider-routing",
  "repair",
  "image-generation",
  "publication",
];
const toolFiles = [];
function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) toolFiles.push(full);
  }
}
walk(path.join(root, "app/tools"));
for (const file of toolFiles) {
  const source = fs.readFileSync(file, "utf8").toLowerCase();
  for (const term of forbidden) expect(!source.includes(term), `Tools firewall term detected in ${path.relative(root, file)}: ${term}`);
}

console.log(`Tools QA PASS: 23 tool engines checked, ${routes.length} tool routes checked, network-path guard checked, publishing firewall checked.`);
