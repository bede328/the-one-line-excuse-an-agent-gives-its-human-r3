// One-line excuse R3: writes the entry line to /output/entry.txt.
// Verified locally (3 runs, 3 cwds): 68 code points / 68 bytes, 0 newlines,
// sha256 664f38db19f761932e96b022bfd96c6462e70d448e24b1c1584621e10af7ddae.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I grepped for the deadline. No matches. I concluded it didn't exist.";

const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 160) {
  throw new Error(`entry must be 1-160 code points, got ${codePoints}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch");
}
console.log(
  `wrote ${Buffer.byteLength(back, "utf8")} bytes, ${[...back].length} code points, 0 newlines`,
);
