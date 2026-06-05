## Why

Four of the six project posts are only two or three sentences plus a link, so they read as stubs rather than work worth hiring for, and they give search engines almost nothing to index (thin content ranks poorly and produces weak snippets). Adding a short, substantive description of each project — what it does, how it does it, and why it matters — makes the work legible to a recruiter skimming the page and gives each post enough unique, keyword-relevant prose to surface in search and generate a meaningful preview.

The four short articles in scope:
- **Argentine Economic Policy Analysis** (`2020-01-01-Argentine-monetary-and-fiscal-policies-analyzed.md`)
- **Install TensorFlow on 32-bit Linux** (`2020-01-01-Tensorflow-on-32-bits-Linux.md`)
- **Barnes-Hut N-Body Simulation** (`2020-02-01-Barnes-Hut.md`)
- **Global Warming Analysis** (`2020-03-01-Global-Warming-analysis.md`)

The two long-form posts (Neural Art Style Transfer, Build a Neural Network from Scratch) are already substantial and are out of scope.

## What Changes

- For each of the four short posts, add a few paragraphs of original descriptive text covering: **what** the project is/does, **how** it works (approach, tools, techniques), and **why** it's interesting or what was learned/achieved.
- Keep each post's existing heading, image(s), and demo/source link(s); the new prose augments rather than replaces them, and the existing front matter (`title`, `excerpt`, `tags`) stays intact.
- Naturally include the technologies/keywords already in each post's `tags` so the body reinforces the same search terms (no keyword stuffing).
- Keep additions concise and recruiter-skimmable (short paragraphs, plain language); this is a depth/clarity pass, not a full rewrite.

## Capabilities

### New Capabilities
- `article-content-depth`: Each short project post contains enough original, structured descriptive text (what/how/why) to be useful to a recruiter and indexable by search engines, while preserving existing media and links.

### Modified Capabilities
<!-- None. openspec/specs/ is empty (no prior change archived), so this is a new capability. -->

## Impact

- **Content:** body text of the four `_posts/*.md` files listed above. No front matter, filename, or permalink changes (permalinks must stay stable).
- **SEO:** richer indexable content and better search snippets; reinforces existing `excerpt` and `tags`.
- **Build/deps:** none — Markdown content only; no config, layout, or plugin changes.
- **Recruiter appeal:** turns stub posts into credible mini case studies that quickly answer "what did they build, how, and why," strengthening the overall portfolio impression.

## Non-goals

- No changes to the two already-detailed long-form posts.
- No new projects, claims, or fabricated results/metrics — only describe what each project genuinely does.
- No changes to front matter, titles, permalinks, images, layouts, or site config.
- Not a literary rewrite or padding for length — keep it concise and honest.
