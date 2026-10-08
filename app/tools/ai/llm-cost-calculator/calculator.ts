export type CostInput={inputTokens:number;outputTokens:number;requests:number;inputPrice:number;outputPrice:number};
export type CostResult={inputCost:number;outputCost:number;monthly:number;yearly:number;perRequest:number};
const n=(v:number)=>Number.isFinite(v)&&v>=0?v:0;
export function calculateLLMCost(raw:CostInput):CostResult{
 const input=n(raw.inputTokens),output=n(raw.outputTokens),requests=n(raw.requests),inputPrice=n(raw.inputPrice),outputPrice=n(raw.outputPrice);
 const inputCost=input/1_000_000*inputPrice*requests,outputCost=output/1_000_000*outputPrice*requests,monthly=inputCost+outputCost;
 return {inputCost,outputCost,monthly,yearly:monthly*12,perRequest:input/1_000_000*inputPrice+output/1_000_000*outputPrice};
}