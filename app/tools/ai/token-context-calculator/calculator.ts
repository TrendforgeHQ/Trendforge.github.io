export type TokenContextInput={text:string;charsPerToken:number;contextWindow:number;reservedOutput:number};
export type TokenContextResult={characters:number;words:number;estimatedTokens:number;availableInput:number;utilization:number;remaining:number};
export function estimateTokenContext(raw:TokenContextInput):TokenContextResult{
 const text=raw.text.trim(),chars=text.length,words=text?text.split(/\s+/).length:0,cpt=Math.max(.5,Number.isFinite(raw.charsPerToken)?raw.charsPerToken:4),window=Math.max(1,Number.isFinite(raw.contextWindow)?raw.contextWindow:1),reserved=Math.min(window,Math.max(0,Number.isFinite(raw.reservedOutput)?raw.reservedOutput:0)),estimatedTokens=text?Math.ceil(chars/cpt):0,availableInput=Math.max(0,window-reserved);
 return {characters:chars,words,estimatedTokens,availableInput,utilization:Math.min(100,estimatedTokens/window*100),remaining:Math.max(0,availableInput-estimatedTokens)};
}