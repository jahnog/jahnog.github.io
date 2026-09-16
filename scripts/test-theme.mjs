#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const weblab = readFileSync(join(root, "assets", "css", "weblab.css"), "utf8");
const custom = readFileSync(join(root, "_sass", "custom-styles", "_custom.scss"), "utf8");
const mainScss = readFileSync(join(root, "assets", "css", "main.scss"), "utf8");
const head = readFileSync(join(root, "_includes", "head", "custom.html"), "utf8");
const config = readFileSync(join(root, "_config.yml"), "utf8");
const footer = readFileSync(join(root, "_includes", "footer.html"), "utf8");

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
if (!/author_profile:\s*false/.test(config)) {
  throw new Error("_config.yml still enables author_profile");
}
if (/logo\s*:\s*\/assets\/images\/the_scream/.test(config)) {
  throw new Error("masthead logo is still the Scream crop");
}
if (!custom.includes(".entries-grid") || !custom.includes("display: grid")) {
  throw new Error("_custom.scss does not turn .entries-grid into a CSS grid");
}
if (!custom.includes("auto-fit") || !custom.includes("minmax(min(100%, 18rem), 1fr)")) {
  throw new Error("_custom.scss must use a fluid auto-fit grid, not fixed column counts");
}
if (!custom.includes("min(100%, 2400px)")) {
  throw new Error("the site shell does not grow with a large window");
}
if (!custom.includes(".entries-list.wl-list") || !custom.includes("minmax(min(100%, 32rem), 1fr)")) {
  throw new Error("the writing list must use a fluid auto-fill grid like the project cards");
}
if (!custom.includes(".entries-grid .grid__item") || !custom.includes("float: none !important")) {
  throw new Error("_custom.scss does not kill Minimal Mistakes grid floats");
}
if (!custom.includes(".archive__item-title a") || !custom.includes("text-decoration: none")) {
  throw new Error("archive titles are not de-underlined");
}
if (footer.includes("Minimal Mistakes")) {
  throw new Error("footer still credits Minimal Mistakes");
}
if (footer.includes("follow_label") || footer.includes("fas fa-")) {
  throw new Error("footer still uses FOLLOW label or icon chrome");
}

const defaultLayout = readFileSync(join(root, "_layouts", "default.html"), "utf8");
if (!defaultLayout.includes("wl-page") || !defaultLayout.includes("wl-shell") || !defaultLayout.includes("wl-main") || !defaultLayout.includes("wl-fill")) {
  throw new Error("default.html does not wrap chrome in wl-page / wl-shell wl-fill / wl-main");
}
const homeLayout = readFileSync(join(root, "_layouts", "home.html"), "utf8");
if (!homeLayout.includes("wl-list")) {
  throw new Error("home.html does not mark the writing list as wl-list");
}
const masthead = readFileSync(join(root, "_includes", "masthead.html"), "utf8");
if (!masthead.includes("wl-topbar")) {
  throw new Error("masthead inner wrap is not a wl-topbar");
}

const archiveSingle = readFileSync(join(root, "_includes", "archive-single.html"), "utf8");
if (!archiveSingle.includes("assign teaser = nil")) {
  throw new Error("archive-single.html does not reset teaser per post");
}
if (archiveSingle.includes("include.type == \"grid\" and teaser")) {
  throw new Error("list entries still hide the post teaser");
}
if (!archiveSingle.includes("wl-list-item")) {
  throw new Error("archive-single.html does not mark list rows as wl-list-item");
}
if (!custom.includes(".entries-list .archive__item-teaser")) {
  throw new Error("_custom.scss does not size list teasers");
}
if (!custom.includes(".visible-links a[href=\"/projects/\"]")) {
  throw new Error("active nav is not scoped to .visible-links (wordmark would turn gold)");
}
if (!custom.includes(".page__inner-wrap") || !custom.includes("float: none")) {
  throw new Error("_custom.scss does not unfloat .page__inner-wrap");
}
if (!weblab.includes(".wl-list-item") || !weblab.includes("border-radius: var(--wl-radius)")) {
  throw new Error("weblab.css does not give list items surface-card radius");
}
if (/max-width:\s*72rem/.test(custom)) {
  throw new Error("_custom.scss still caps chrome at 72rem");
}
if (custom.includes("--wl-max: 100%")) {
  throw new Error("_custom.scss must not unset --wl-max; the 1500px cap is what keeps the layout responsive");
}
if (!custom.includes("font-size: 16px !important")) {
  throw new Error("html root font-size is not pinned to 16px");
}
if (!weblab.includes(".wl-main") || !weblab.includes("margin: 0 auto")) {
  throw new Error("weblab.css is missing the centered shell / wl-main fill");
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
