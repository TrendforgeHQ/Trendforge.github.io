import { PromptComparator } from "./PromptComparator";

export const metadata = { title:"Prompt Comparator | TrendForge Tools", description:"Compare two prompts with transparent browser-side heuristics without sending prompt text to an AI API.", alternates:{canonical:"/tools/ai/prompt-comparator/"} };

export default function PromptComparatorPage(){ return <PromptComparator/>; }