"use client";

import { useMemo, useState } from "react";
import { optimizePrompt } from "./optimizer";

export function PromptOptimizer() {
  const [prompt, setPrompt] = useState("");
  const result = useMemo(() => optimizePrompt(prompt), [prompt]);

  return (
    <main className="article">
      <p className="eyebrow">TrendForge Tools · AI Utility</p>
      <h1>Prompt Optimizer</h1>
      <p>Improve prompt clarity with transparent browser-side checks. Your prompt is not sent to an AI service.</p>
      <label htmlFor="prompt-input">Your prompt</label>
      <textarea id="prompt-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={12} placeholder="Paste or write your prompt..." />
      <div aria-live="polite">
        <p>Heuristic score: {result.score}/100</p>
        {result.findings.map((finding) => (
          <section key={finding.id}>
            <strong>{finding.title}</strong>
            <p>{finding.reason}</p>
          </section>
        ))}
      </div>
      <label htmlFor="optimized-output">Improved prompt</label>
      <textarea id="optimized-output" value={result.improvedPrompt} readOnly rows={12} />
      <button type="button" onClick={() => navigator.clipboard?.writeText(result.improvedPrompt)} disabled={!result.improvedPrompt}>Copy improved prompt</button>
      <button type="button" onClick={() => setPrompt("")}>Reset</button>
    </main>
  );
}
