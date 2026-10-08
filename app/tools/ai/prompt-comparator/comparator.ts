import { optimizePrompt } from "../prompt-optimizer/optimizer";

export type PromptComparison = {
  leftScore: number; rightScore: number; leftWords: number; rightWords: number;
  leftTokens: number; rightTokens: number; differences: string[];
  winner: "left" | "right" | "tie";
};

function words(text: string) { return text.trim() ? text.trim().split(/\s+/).length : 0; }
function tokens(text: string) { return text.trim() ? Math.ceil(text.trim().length / 4) : 0; }

export function comparePrompts(leftInput: string, rightInput: string): PromptComparison {
  const left = leftInput.trim(), right = rightInput.trim();
  const a = optimizePrompt(left), b = optimizePrompt(right);
  const differences: string[] = [];
  if (a.score !== b.score) differences.push(a.score > b.score ? "Prompt A has fewer heuristic issues." : "Prompt B has fewer heuristic issues.");
  if (words(left) !== words(right)) differences.push(\`Prompt \${words(left) < words(right) ? "A" : "B"} is more concise by \${Math.abs(words(left)-words(right))} word\${Math.abs(words(left)-words(right)) === 1 ? "" : "s"}.\`);
  if (tokens(left) !== tokens(right)) differences.push(\`Estimated token use differs by about \${Math.abs(tokens(left)-tokens(right))} tokens.\`);
  if (!differences.length) differences.push("The prompts are structurally similar under the current checks.");
  const winner = !left || !right ? "tie" : a.score === b.score ? "tie" : a.score > b.score ? "left" : "right";
  return {leftScore:a.score,rightScore:b.score,leftWords:words(left),rightWords:words(right),leftTokens:tokens(left),rightTokens:tokens(right),differences,winner};
}