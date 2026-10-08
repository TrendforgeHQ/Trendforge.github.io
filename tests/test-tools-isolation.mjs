import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const toolRoot = path.join(root, "app", "tools");
const forbidden = [
  "article-generation", "evidence", "claim-verification", "writer",
  "provider-routing", "repair", "image-generation", "publication",
];

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const file of walk(toolRoot)) {
  const source = fs.readFileSync(file, "utf8").toLowerCase();
  for (const term of forbidden) {
    if (source.includes(term)) throw new Error(`Tools isolation guard failed: ${file} contains ${term}`);
  }
}

console.log("Tools publishing-pipeline isolation guard passed.");
