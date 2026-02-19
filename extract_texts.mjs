import fs from "node:fs";

const src = "C:/LTCOM DEV/Szarvasi Mozarella/dev export/resource/artboard-be6289b3-d729-4970-a3ef-bd1a80db2937.agc";
const d = JSON.parse(fs.readFileSync(src, "utf8"));
const texts = new Set();
function walk(n) {
  if (!n || typeof n !== "object") return;
  if (Array.isArray(n)) { n.forEach(walk); return; }
  for (const [k, v] of Object.entries(n)) {
    if (typeof v === "string" && ["text", "rawText", "value", "content"].includes(k) && v.trim().length > 2) {
      texts.add(v.trim());
    }
    walk(v);
  }
}
walk(d);
for (const t of texts) console.log(">>>", t);
