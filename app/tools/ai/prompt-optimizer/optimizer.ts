export type PromptFinding = {
  id: string;
  severity: "info" | "suggestion";
  title: string;
  reason: string;
};

export type PromptOptimization = {
  score: number;
  findings: PromptFinding[];
  improvedPrompt: string;
};

const sentenceCount = (text: string) =>
  text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean).length;

export function optimizePrompt(input: string): PromptOptimization {
  const prompt = input.trim();
  if (!prompt) return { score: 0, findings: [], improvedPrompt: "" };

  const lower = prompt.toLowerCase();
  const findings: PromptFinding[] = [];

  if (prompt.length < 40) findings.push({
    id: "context",
    severity: "suggestion",
    title: "Add useful context",
    reason: "A little context can reduce ambiguity and make the requested result more consistent.",
  });

  if (!/\b(write|create|build|explain|compare|analy[sz]e|summari[sz]e|generate|calculate|list|find|review|convert|design|fix)\b/i.test(prompt)) {
    findings.push({
      id: "objective",
      severity: "suggestion",
      title: "Make the objective explicit",
      reason: "Start with a clear action so the expected task is easy to understand.",
    });
  }

  if (!/(format|table|bullet|json|markdown|steps|paragraph|csv|code)/i.test(prompt)) findings.push({
    id: "format",
    severity: "suggestion",
    title: "Specify the output format",
    reason: "A defined format makes the expected answer easier to follow and evaluate.",
  });

  if (/\b(good|best|nice|proper|professional|high quality|quickly)\b/i.test(prompt) && !/(define|criteria|must|should|include|exclude)/i.test(prompt)) findings.push({
    id: "quality",
    severity: "suggestion",
    title: "Define quality expectations",
    reason: "Vague quality words can produce different interpretations; measurable requirements are clearer.",
  });

  const normalized = lower.replace(/\s+/g, " ");
  if (normalized.length > 4000) findings.push({
    id: "length",
    severity: "info",
    title: "Consider structure",
    reason: "Long prompts are easier to follow when context, task, constraints, and output requirements are separated.",
  });

  const score = Math.max(0, Math.min(100, 100 - findings.filter((f) => f.severity === "suggestion").length * 15));
  const improved = buildImprovedPrompt(prompt, findings);
  return { score, findings, improvedPrompt: improved };
}

function buildImprovedPrompt(prompt: string, findings: PromptFinding[]): string {
  if (!findings.length) return prompt;
  const lines = ["Task:", prompt, "", "Output requirements:"];
  if (findings.some((f) => f.id === "format")) lines.push("- Use a clear, structured format.");
  if (findings.some((f) => f.id === "quality")) lines.push("- Follow explicit, measurable requirements where applicable.");
  if (findings.some((f) => f.id === "context")) lines.push("- Preserve the user's intent and ask for missing context rather than inventing it.");
  return lines.join("\n");
}
