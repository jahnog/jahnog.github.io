## Why

The previous change (`enrich-short-project-articles`) added useful descriptions to the four short posts, but did so with a rigid, templated shape: every post carries the same bold prefixes — **What it does.**, **How it works.**, **Why it matters/it's useful/it's interesting.** That structure reads as machine-generated and repetitive across posts, which undercuts the professional, personal impression the portfolio is meant to make on a recruiter. The information is right; the voice is wrong.

The four posts in scope (same as before):
- **Argentine Economic Policy Analysis** (`2020-01-01-Argentine-monetary-and-fiscal-policies-analyzed.md`)
- **Install TensorFlow on 32-bit Linux** (`2020-01-01-Tensorflow-on-32-bits-Linux.md`)
- **Barnes-Hut N-Body Simulation** (`2020-02-01-Barnes-Hut.md`)
- **Global Warming Analysis** (`2020-03-01-Global-Warming-analysis.md`)

## What Changes

- Remove the templated bold prefixes (**What it does.**, **How it works.**, **Why it matters.**, **Why it's useful.**, **Why it's interesting.**) from the four posts.
- Rewrite the added text as flowing, first-person prose that reads like the author explaining their own project — the same substance (what / how / why), but woven into connected paragraphs with natural transitions instead of three labeled blocks.
- Keep each post's existing heading, image(s), demo/source link(s), and front matter (`title`, `excerpt`, `tags`) unchanged, and keep the technologies/keywords present so SEO depth isn't lost.
- Preserve the honesty constraint: no new claims or invented metrics; keep the previously flagged items intact (Barnes-Hut "Alpha" status; TensorFlow Bazel mention) unless the author says otherwise.

## Capabilities

### New Capabilities
- `article-prose-style`: The short posts' descriptive text reads as natural, continuous human prose — no templated section labels — while still conveying what each project does, how, and why.

### Modified Capabilities
<!-- None. openspec/specs/ is empty (prior changes not archived), so this is a new capability covering prose style. -->

## Impact

- **Content:** body prose of the four `_posts/*.md` files. No front matter, filename, image, link, or permalink changes.
- **SEO:** preserves the indexable depth and keywords added previously; only the phrasing/structure changes.
- **Build/deps:** none — Markdown content only.
- **Recruiter appeal:** replaces a formulaic, AI-sounding structure with a confident personal voice, which reads as more credible and engaging to someone evaluating the candidate.

## Non-goals

- No changes to the two long-form posts.
- No change to the substance/intent of each description — this is a voice/flow rewrite, not new information.
- No front matter, title, permalink, image, link, layout, or config changes.
- Not a length-padding pass; keep each description roughly the same length (still ≥ ~120 words of real content).
