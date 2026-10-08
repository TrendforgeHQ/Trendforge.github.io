import assert from "node:assert/strict";
import { comparePrompts } from "../app/tools/ai/prompt-comparator/comparator";
import { calculateLLMCost } from "../app/tools/ai/llm-cost-calculator/calculator";
import { estimateTokenContext } from "../app/tools/ai/token-context-calculator/calculator";
import { calculateRAGChunks } from "../app/tools/ai/rag-chunking-calculator/calculator";

const comparison=comparePrompts("Write a summary.","Write a three-bullet summary of this report.");
assert.ok(comparison.leftScore>=0&&comparison.leftScore<=100);
assert.ok(comparison.rightScore>=0&&comparison.rightScore<=100);
assert.ok(comparison.rightWords>0);

const cost=calculateLLMCost({inputTokens:1000,outputTokens:500,requests:1000,inputPrice:1,outputPrice:2});
assert.equal(cost.perRequest,0.002);
assert.equal(cost.monthly,2);

const context=estimateTokenContext({text:"a".repeat(400),charsPerToken:4,contextWindow:200,reservedOutput:50});
assert.equal(context.estimatedTokens,100);
assert.equal(context.availableInput,150);
assert.equal(context.remaining,50);

const rag=calculateRAGChunks({text:"a".repeat(4000),chunkSize:500,overlap:100,charsPerToken:4});
assert.equal(rag.tokens,1000);
assert.equal(rag.chunks,3);
assert.equal(rag.lastChunkTokens,200);

console.log("AI tools suite tests passed.");