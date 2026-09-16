#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const weblab = readFileSync(join(root, "assets", "css", "weblab.css"), "utf8");
const custom = readFileSync(join(root, "_sass", "custom-styles", "_custom.scss"), "utf8");
const head = readFileSync(join(root, "_includes", "head", "custom.html"), "utf8");

for (const token of ["#050821", "#f4b223", "#121548", "#b5c5e8"]) {
  if (!weblab.includes(token)) throw new Error(`missing ${token}`);
}
for (const token of ["backdrop-filter", "#72d6cb", "#04111d"]) {
  if (weblab.includes(token)) throw new Error(`forbidden ${token}`);
}
if (!head.includes("weblab.css")) throw new Error("head/custom.html does not link weblab.css");
if (!custom.includes("var(--wl-bg)") || !custom.includes("var(--wl-gold)")) {
  throw new Error("_custom.scss does not bind chrome to --wl-*");
}

console.log("theme tokens ok");
