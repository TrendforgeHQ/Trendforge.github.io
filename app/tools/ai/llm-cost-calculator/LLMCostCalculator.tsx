"use client";

import { useMemo, useState } from "react";
import styles from "../ai-tool.module.css";
import { calculateLLMCost } from "./calculator";

const initial={inputTokens:2000,outputTokens:500,requests:10000,inputPrice:2,outputPrice:8};
const money=(v:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:4}).format(v);

export function LLMCostCalculator(){
 const [v,setV]=useState(initial),result=useMemo(()=>calculateLLMCost(v),[v]);
 const update=(key:keyof typeof initial)=>(e:React.ChangeEvent<HTMLInputElement>)=>setV({...v,[key]:Math.max(0,Number(e.target.value)||0)});
 return <main className={styles.toolPage}><div className={styles.intro}><p className="eyebrow">TrendForge Tools · AI Utility</p><h1>LLM Cost Calculator</h1><p>Estimate per-request, monthly and yearly model spend from your own token volume and pricing assumptions. Nothing is sent to an API.</p><span className={styles.privacy}>Use current provider pricing · browser-side calculation</span></div>
 <div className={styles.workspace}><section className={styles.panel}><div className={styles.fieldGrid}>
 {([["inputTokens","Input tokens / request"],["outputTokens","Output tokens / request"],["requests","Requests / month"],["inputPrice","Input price / 1M tokens"],["outputPrice","Output price / 1M tokens"]] as const).map(([key,label])=><label className={styles.field} key={key}><span className={styles.label}>{label}</span><input className={styles.input} type="number" min="0" step="any" value={v[key]} onChange={update(key)}/></label>)}
 </div><p className={styles.note}>Prices are user-provided USD assumptions. Check your provider's current pricing before budgeting.</p></section>
 <section className={styles.panel} aria-live="polite"><div className={styles.results}><div className={styles.metric}><span>Per request</span><strong>{money(result.perRequest)}</strong></div><div className={styles.metric}><span>Monthly</span><strong>{money(result.monthly)}</strong></div><div className={styles.metric}><span>Yearly</span><strong>{money(result.yearly)}</strong></div></div><div className={styles.findingList}><div className={styles.finding}><strong>Monthly input cost</strong><p>{money(result.inputCost)}</p></div><div className={styles.finding}><strong>Monthly output cost</strong><p>{money(result.outputCost)}</p></div></div></section></div>
 <div className={styles.help}><section><h2>How to use it</h2><ul><li>Estimate average input and output tokens.</li><li>Enter requests per month.</li><li>Paste the provider's current per-million-token prices.</li></ul></section><section><h2>Why manual pricing?</h2><p>Model prices change. Keeping pricing editable avoids hard-coding stale commercial data into the tool.</p></section></div></main>;
}