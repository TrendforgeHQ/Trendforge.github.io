"use client";

import { useMemo, useState } from "react";
import { comparePrompts } from "./comparator";
import styles from "../ai-tool.module.css";

export function PromptComparator() {
  const [left,setLeft]=useState(""), [right,setRight]=useState("");
  const result=useMemo(()=>comparePrompts(left,right),[left,right]);
  return <main className={styles.toolPage}>
    <div className={styles.intro}><p className="eyebrow">TrendForge Tools · AI Utility</p><h1>Prompt Comparator</h1><p>Compare two prompts using the same transparent browser-side checks. No model call and no prompt upload.</p><span className={styles.privacy}>Private by default · deterministic checks</span></div>
    <div className={styles.workspace}>
      <div className={styles.panelGrid}>
        <section className={styles.panel}><label className={styles.label} htmlFor="prompt-a">Prompt A</label><textarea className={styles.textarea} id="prompt-a" value={left} onChange={e=>setLeft(e.target.value)} placeholder="Paste the first prompt..." /></section>
        <section className={styles.panel}><label className={styles.label} htmlFor="prompt-b">Prompt B</label><textarea className={styles.textarea} id="prompt-b" value={right} onChange={e=>setRight(e.target.value)} placeholder="Paste the second prompt..." /></section>
      </div>
      <section className={styles.panel} aria-live="polite"><div className={styles.results}>
        <div className={styles.metric}><span>Prompt A score</span><strong>{result.leftScore}/100</strong></div><div className={styles.metric}><span>Prompt B score</span><strong>{result.rightScore}/100</strong></div><div className={styles.metric}><span>Heuristic result</span><strong>{result.winner==="tie"?"Tie":result.winner==="left"?"A":"B"}</strong></div>
      </div>
      <div className={styles.tableWrap}><table className={styles.compareTable}><thead><tr><th>Measure</th><th>Prompt A</th><th>Prompt B</th></tr></thead><tbody><tr><td>Words</td><td>{result.leftWords}</td><td>{result.rightWords}</td></tr><tr><td>Estimated tokens</td><td>{result.leftTokens}</td><td>{result.rightTokens}</td></tr></tbody></table></div>
      <div className={styles.findingList}>{result.differences.map((d,i)=><div className={styles.finding} key={i}><strong>Comparison</strong><p>{d}</p></div>)}</div>
      <div className={styles.actions}><button className={styles.button} onClick={()=>{setLeft(right);setRight(left)}} type="button">Swap prompts</button><button className={styles.button+" "+styles.secondary} onClick={()=>{setLeft("");setRight("")}} type="button">Reset</button></div></section>
    </div>
    <div className={styles.help}><section><h2>What it compares</h2><ul><li>Prompt clarity signals</li><li>Word and estimated token size</li><li>Structural suggestions</li></ul></section><section><h2>Important</h2><p>The score is a heuristic, not a prediction of model output quality. A different model may prefer a different prompt.</p></section></div>
  </main>;
}