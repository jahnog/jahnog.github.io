## Context

Four project posts are thin stubs (a heading, one or two sentences, an image, and a link). The site renders them via the Minimal Mistakes `single` layout; each already has good front matter (`title`, `excerpt`, `header.teaser`, `tags`) from the prior change. This change is purely Markdown body content — no layout, config, or dependency work. The author has direct knowledge of each project; the risk is writing *accurate* descriptions, not technical complexity.

## Goals / Non-Goals

**Goals:**
- Add concise, original what/how/why prose to the four short posts.
- Improve indexable depth and search snippets while staying recruiter-skimmable.
- Preserve all existing headings, media, links, and front matter (stable permalinks).

**Non-Goals:**
- Touching the two long-form posts.
- Any front matter, layout, config, or plugin change.
- Padding for length or any fabricated claims/metrics.

## Decisions

**1. Use a consistent, light structure per post rather than free-form text.**
For each post, add a few short paragraphs (optionally under small sub-headings like "What it does", "How it works", "Why it's interesting"), placed after the existing intro/image and keeping the existing demo/source link prominent. Rationale: a predictable shape makes the posts scannable for recruiters and gives search engines clear, topical prose. *Alternative considered:* one long paragraph per post (rejected — harder to skim).

**2. Keep headings as `##`/`###` below the page title.**
The Minimal Mistakes `single` layout renders the front-matter `title` as the page `h1`; body sub-headings stay at `##`/`###` to preserve a single `h1` and correct heading order. Rationale: accessibility (semantic heading hierarchy) and consistency with the other posts.

**3. Draft from each project's existing content + linked source, and flag anything uncertain.**
Descriptions are derived from what's already in the post and its linked demo/repo/notebook. Where a concrete detail isn't verifiable from available context, keep the wording general rather than guessing. Rationale: satisfies the "honest, no fabricated claims" requirement.

**4. Reinforce existing tags naturally.**
Weave each post's declared technologies (e.g., `scala`/`scala-js`, `tensorflow`/`python`, `data-analysis`) into the prose once or twice where it reads naturally. Rationale: aligns body keywords with `tags`/`excerpt` for SEO without stuffing.

## Risks / Trade-offs

- **Inaccurate descriptions** → Draft conservatively from existing content; surface any detail that can't be verified for the author to confirm rather than inventing it.
- **Over-writing / padding** → Cap each addition at a few short paragraphs; this is a depth pass, not an essay.
- **Accidental permalink/front-matter drift** → Only edit body text below the front matter; rebuild and diff post URLs against the current build to confirm no change.
- **Performance/accessibility** → Text-only additions have negligible page-weight impact; keep heading order semantic and any new link text descriptive.

## Migration Plan

1. For each of the four posts, append the descriptive section(s) below the existing intro, keeping image and demo/source links.
2. Rebuild locally (`bundle exec jekyll build`) and confirm the posts render, links/images still resolve, and permalinks are unchanged.
3. Commit/deploy via the normal flow (left to the user).

Rollback: revert the per-file content edits; no structural changes to undo.

## Open Questions

- For the Barnes-Hut post, is the simulation still "Alpha / not optimized," or should the status text be updated?
- Any specific outcomes/metrics the author wants highlighted (e.g., dataset sizes, performance) that aren't already in the posts?
