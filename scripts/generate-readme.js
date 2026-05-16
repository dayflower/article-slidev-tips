import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = readFileSync(join(root, "slides.md"), "utf8");

const output = input
  .replace(/^---\n([^\n]+\n)+---\n/gm, "")
  .replace(/^---\n/gm, "")
  .replace(/\n{3,}/g, "\n\n")
  .replace(/^\n+/, "")
  .replace(/\n*$/, "\n");

writeFileSync(join(root, "README.md"), output);
