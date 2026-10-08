import type { Metadata } from "next";
import { PromptOptimizer } from "./PromptOptimizer";

export const metadata: Metadata = {
  title: "Prompt Optimizer | TrendForge Tools",
  description: "Improve prompts with transparent, browser-side checks. Your prompt stays in your browser and is not sent to an AI API.",
  alternates: { canonical: "/tools/ai/prompt-optimizer/" },
};

export default function PromptOptimizerPage() {
  return <PromptOptimizer />;
}
