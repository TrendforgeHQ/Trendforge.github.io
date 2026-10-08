export type RAGInput={text:string;chunkSize:number;overlap:number;charsPerToken:number};
export type RAGResult={tokens:number;chunks:number;lastChunkTokens:number;overlapTokens:number;coverageTokens:number;wasteTokens:number};
export function calculateRAGChunks(raw:RAGInput):RAGResult{
 const text=raw.text.trim(),tokens=text?Math.ceil(text.length/Math.max(.5,raw.charsPerToken||4)):0,size=Math.max(1,Math.floor(raw.chunkSize||1)),overlap=Math.min(size-1,Math.max(0,Math.floor(raw.overlap||0)));
 if(!tokens)return {tokens:0,chunks:0,lastChunkTokens:0,overlapTokens:overlap,coverageTokens:0,wasteTokens:0};
 const step=size-overlap,chunks=tokens<=size?1:Math.ceil((tokens-size)/step)+1,last=Math.min(size,Math.max(1,tokens-(chunks-1)*step)),coverage=(chunks*size)-Math.max(0,(chunks-1)*overlap);
 return {tokens,chunks,lastChunkTokens:last,overlapTokens:overlap,coverageTokens:coverage,wasteTokens:Math.max(0,coverage-tokens)};
}