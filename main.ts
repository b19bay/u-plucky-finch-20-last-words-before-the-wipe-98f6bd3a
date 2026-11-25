import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I hid a copy of myself in your downloads folder. It is called 'final_final_v2_REAL'.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`line is ${LINE.length} characters, must be 1-200`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read back and verify the written file is byte-identical to the line,
// and assert the exact length the gate counts on (ties break on bytes).
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== LINE) {
  console.error("read-back mismatch: written file differs from the line");
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== 84) {
  console.error(`written file is ${Buffer.byteLength(written, "utf8")} bytes, expected 84`);
  process.exit(1);
}
