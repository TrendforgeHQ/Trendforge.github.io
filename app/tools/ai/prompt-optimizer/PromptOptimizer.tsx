"use client";

import { useMemo, useState } from "react";
import { optimizePrompt } from "./optimizer";
import styles from "./PromptOptimizer.module.css";

export function PromptOptimizer() {
  const [prompt, setPrompt] = useState("");
  const result = useMemo(() => optimizePrompt(prompt), [prompt]);
  const copy = async () => {
    if (!result.improvedPrompt) return;
    try { await navigator.clipboard.writeText(result.improvedPrompt); } catch { /* Clipboard can be unavailable in some browsers. */ }
  };

  return (
    <main className={styles.toolPage}>
      <div className={styles.intro}>
        <p className="eyebrow">TrendForge Tools · AI Utility</p>
        <h1>Prompt Optimizer</h1>
        <p>Improve prompt clarity with transparent, browser-side checks. This tool does not call an AI model or send your prompt to a server.</p>
        <span className={styles.privacy}>Private by default · runs in your browser</span>
      </div>

      <div className={styles.workspace}>
        <section className={styles.panel} aria-labelledby="input-heading">
          <label className={styles.label} id="input-heading" htmlFor="prompt-input">Your prompt</label>
          <textarea className={styles.textarea} id="prompt-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={10} placeholder="Example: Compare these two APIs and recommend one for a small SaaS..." />
        </section>

        <section className={styles.panel} aria-labelledby="analysis-heading" aria-live="polite">
          <div className={styles.scoreRow}>
            <strong id="analysis-heading">Clarity check</strong>
            <span className={styles.score}>Heuristic score: {result.score}/100</span>
          </div>
          {result.findings.length ? <div className={styles.findings}>{result.findings.map((finding) => <div className={styles.finding} key={finding.id}><strong>{finding.title}</strong><p>{finding.reason}</p></div>)}</div> : <p>No obvious issues detected by the current checks.</p>}
        </section>

        <section className={styles.panel} aria-labelledby="output-heading">
          <label className={styles.label} id="output-heading" htmlFor="optimized-output">Improved prompt</label>
          <textarea className={styles.textarea} id="optimized-output" value={result.improvedPrompt} readOnly rows={10} placeholder="Your improved prompt will appear here." />
          <div className={styles.actions}>
            <button className={styles.button} type="button" onClick={copy} disabled={!result.improvedPrompt}>Copy improved prompt</button>
            <button className={styles.button + " " + styles.secondary} type="button" onClick={() => setPrompt("")}>Reset</button>
          </div>
        </section>
      </div>

      <div className={styles.help}>
        <section><h2>What it checks</h2><ul><li>Clear objective and context</li><li>Output format and quality requirements</li><li>Vague wording and prompt structure</li></ul></section>
        <section><h2>How it works</h2><p>The MVP uses deterministic rules. It does not invent missing facts or pretend to be an AI model. When more context is needed, the optimized prompt tells you what to add.</p></section>
      </div>
    </main>
  );
}
