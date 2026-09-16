#!/usr/bin/env node
// Guards the WebLook reskin: the site is built from local layouts styled by
// the vendored weblab.css, with no Minimal Mistakes anywhere.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...parts) => readFileSync(join(root, ...parts), "utf8");

const weblab = read("assets", "css", "weblab.css");
const site = read("assets", "css", "site.css");
const config = read("_config.yml");
const head = read("_includes", "head.html");
const header = read("_includes", "header.html");
const footer = read("_includes", "footer.html");
const analytics = read("_includes", "analytics.html");
const card = read("_includes", "post-card.html");
const defaultLayout = read("_layouts", "default.html");
const homeLayout = read("_layouts", "home.html");
const postLayout = read("_layouts", "post.html");
const archiveLayout = read("_layouts", "archive.html");

const fail = (message) => {
  throw new Error(message);
};

// --- template tokens -------------------------------------------------------

for (const token of ["#050821", "#f4b223", "#121548", "#b5c5e8"]) {
  if (!weblab.includes(token)) fail(`weblab.css is missing ${token}`);
}
for (const token of ["backdrop-filter", "#72d6cb", "#04111d"]) {
  if (weblab.includes(token)) fail(`weblab.css contains forbidden ${token}`);
}
for (const token of ["--wl-space-4", "--wl-text-base", "--wl-measure"]) {
  if (!weblab.includes(token)) fail(`weblab.css predates the ${token} scale`);
}
for (const cls of [".wl-prose", ".wl-card-grid", ".wl-list-item", ".wl-main"]) {
  if (!weblab.includes(cls)) fail(`weblab.css is missing ${cls}`);
}
if (!weblab.includes("margin: 0 auto")) {
  fail("weblab.css is missing the centered shell");
}

// Chrome must stay flat: the topbar is a hairline bar, not a card.
const topbarRule = weblab.match(/\.wl-topbar \{[^}]+\}/)?.[0] ?? "";
if (!topbarRule.includes("border-bottom")) {
  fail(".wl-topbar is not a hairline bar");
}
if (topbarRule.includes("box-shadow") || topbarRule.includes("border-radius")) {
  fail(".wl-topbar went back to a card treatment");
}
if (!weblab.includes(".wl-boxed")) {
  fail(".wl-boxed opt-in is gone; consumers lose the card escape hatch");
}

// Mobile first: no desktop-first max-width breakpoints.
if (/@media \(max-width/.test(weblab)) {
  fail("weblab.css has a desktop-first max-width media query");
}
if (!weblab.includes("@media (min-width: 40rem)")) {
  fail("weblab.css is missing the 40rem breakpoint");
}

// --- no Minimal Mistakes ---------------------------------------------------

if (existsSync(join(root, "_sass"))) {
  fail("_sass still exists; the Minimal Mistakes bridge should be gone");
}
if (existsSync(join(root, "assets", "css", "main.scss"))) {
  fail("assets/css/main.scss still exists");
}
if (existsSync(join(root, "assets", "js"))) {
  fail("assets/js still exists; the site ships no JavaScript bundle");
}
if (/remote_theme|minimal_mistakes/.test(config)) {
  fail("_config.yml still references Minimal Mistakes");
}
for (const [name, source] of [
  ["head.html", head],
  ["header.html", header],
  ["footer.html", footer],
  ["post-card.html", card],
]) {
  if (/masthead|greedy-nav|archive__item|page__/.test(source)) {
    fail(`${name} still uses Minimal Mistakes markup`);
  }
}

// --- layouts bind to the template -----------------------------------------

if (!head.includes("weblab.css")) fail("head.html does not link weblab.css");
if (!head.includes("site.css")) fail("head.html does not link site.css");
if (!head.includes("{% seo %}")) fail("head.html dropped jekyll-seo-tag");
if (!head.includes("og:image")) fail("head.html no longer emits a social image");

for (const cls of ["wl-page", "wl-shell", "wl-fill", "wl-main"]) {
  if (!defaultLayout.includes(cls)) fail(`default.html is missing .${cls}`);
}
if (!defaultLayout.includes("analytics.html")) {
  fail("default.html no longer includes analytics");
}
if (!header.includes("wl-topbar") || !header.includes("wl-nav")) {
  fail("header.html is not a wl-topbar with wl-nav");
}
if (!header.includes('aria-current="page"')) {
  fail("header.html does not mark the current nav item");
}
if (!footer.includes("wl-footer")) fail("footer.html is not a wl-footer");
if (!homeLayout.includes("wl-list")) fail("home.html does not use wl-list");
if (!postLayout.includes("wl-prose")) fail("post.html does not use wl-prose");
if (!archiveLayout.includes("wl-card-grid")) {
  fail("archive.html does not use wl-card-grid");
}
if (!card.includes("wl-list-item") || !card.includes("wl-panel")) {
  fail("post-card.html lost its list or grid variant");
}

// --- preserved behaviour ---------------------------------------------------

if (!/permalink:\s*\/:categories\/:title\//.test(config)) {
  fail("post permalinks changed; existing URLs would break");
}
if (!/paginate_path:\s*\/page:num\//.test(config)) {
  fail("pagination paths changed");
}
for (const plugin of ["jekyll-feed", "jekyll-sitemap", "jekyll-gist", "jekyll-seo-tag"]) {
  if (!config.includes(plugin)) fail(`_config.yml dropped ${plugin}`);
}
if (!analytics.includes('location.hostname !== "jahnog.github.io"')) {
  fail("the Matomo production-host guard is gone");
}
if (!site.includes(".centered-image")) {
  fail("site.css dropped .centered-image, used by the older posts");
}

// --- built output, when present --------------------------------------------

const builtHome = join(root, "_site", "index.html");
if (existsSync(builtHome)) {
  const built = readFileSync(builtHome, "utf8");
  if (/minimal-mistakes|greedy-nav|jquery/i.test(built)) {
    fail("built HTML still references Minimal Mistakes assets");
  }
  if (!built.includes("weblab.css")) {
    fail("built HTML does not load weblab.css");
  }
}

console.log("theme ok");
