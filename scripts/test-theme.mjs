#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const weblab = readFileSync(join(root, "assets", "css", "weblab.css"), "utf8");
const custom = readFileSync(join(root, "_sass", "custom-styles", "_custom.scss"), "utf8");
const mainScss = readFileSync(join(root, "assets", "css", "main.scss"), "utf8");
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
if (!mainScss.includes("$primary-color: #f4b223")) {
  throw new Error("main.scss does not pin MM $primary-color to gold before the skin");
}
if (!custom.includes(".btn--primary") || !custom.includes("var(--wl-on-gold)")) {
  throw new Error("_custom.scss does not set navy labels on gold primary buttons");
}
if (!custom.includes(".pagination li a.current")) {
  throw new Error("_custom.scss does not remap pagination current to gold");
}

const compiledPath = join(root, "_site", "assets", "css", "main.css");
if (existsSync(compiledPath)) {
  const compiled = readFileSync(compiledPath, "utf8");
  if (compiled.includes("#00adb5")) {
    throw new Error("compiled main.css still contains teal #00adb5");
  }
  const btnRules = compiled.match(/\.btn--primary[^{]*\{[^}]+\}/g) || [];
  const lastBtn = btnRules.at(-1) || "";
  if (!lastBtn.includes("var(--wl-gold)") || !lastBtn.includes("var(--wl-on-gold)")) {
    throw new Error(`last compiled .btn--primary is not gold/navy: ${lastBtn}`);
  }
  const pageRules = compiled.match(/\.pagination li a\.current[^}]+\}/g) || [];
  const lastPage = pageRules.at(-1) || "";
  if (!lastPage.includes("var(--wl-gold)") || !lastPage.includes("var(--wl-on-gold)")) {
    throw new Error(`last compiled pagination current is not gold/navy: ${lastPage}`);
  }
}

console.log("theme tokens ok");
