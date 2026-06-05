## Context

In the prior change, each short post gained a description shaped as three bold-labeled blocks (**What it does.** / **How it works.** / **Why it matters.**). It's accurate but formulaic and identical in structure across all four posts, which reads as machine-generated. This change is a pure prose rewrite of that added text — no structural, layout, or metadata work. The author knows each project, so accuracy isn't the risk; preserving substance while changing voice is the goal.

## Goals / Non-Goals

**Goals:**
- Drop the templated labels and rewrite each description as natural, first-person, connected prose.
- Keep the same facts, technologies/keywords, and roughly the same depth (SEO neutral-to-positive).
- Leave headings, images, links, and front matter untouched (stable permalinks).

**Non-Goals:**
- Touching the long-form posts, adding new information, or changing intent.
- Any front matter, layout, config, or dependency change; no length padding.

## Decisions

**1. First-person, narrative voice with transitions.**
Rewrite each description as 1–2 short paragraphs in the author's voice (e.g., "I built…", "The idea was…"), using connective phrasing so the what → how → why flows as a single explanation rather than three answers. Rationale: matches a personal portfolio and reads as human; directly addresses the complaint. *Alternative considered:* keep labels but vary wording (rejected — still templated).

**2. Replace only the previously added block; keep the original intro line.**
For each post, the rewrite targets exactly the labeled paragraphs added last time, leaving the pre-existing opening sentence, image, and closing demo/source link in place. Rationale: minimal, safe diff; preserves media/link placement and permalinks.

**3. Preserve facts and flagged items verbatim in meaning.**
Carry over the same concrete points (e.g., World Bank indicators + pandas; Bazel build for 32-bit/i386; Barnes-Hut quadtree O(n log n) in Scala.js; 1975–2015 temperature anomalies) and keep the Barnes-Hut "Alpha" status. Rationale: honesty and SEO keyword continuity. Anything uncertain stays general, as before.

**4. Keep length comparable (≥ ~120 words of real content).**
Aim for similar word counts so indexable depth from the last change isn't lost. Rationale: this is a voice change, not a trim.

## Risks / Trade-offs

- **Losing a keyword or fact while smoothing prose** → Diff each rewrite against the prior version to confirm the same technologies/facts still appear; keep word count comparable.
- **Drifting into a different/inaccurate claim** → Rewrite meaning-for-meaning; don't add anything not already stated; keep flagged items as-is.
- **Accidental permalink/front-matter/link drift** → Edit body prose only; rebuild and confirm the four permalinks and links/images are unchanged.
- **Over-correction into casual/unprofessional tone** → Aim for confident and natural but still professional; short paragraphs, plain language.

## Migration Plan

1. For each of the four posts, replace the labeled block with flowing prose, leaving intro, image, and link intact.
2. Rebuild locally (`bundle exec jekyll build`); confirm posts render, links/images resolve, permalinks unchanged, and no templated labels remain.
3. Commit/deploy via the normal flow (left to the user).

Rollback: revert the per-file content edits (or restore the prior change's text); no structural changes to undo.

## Open Questions

- Preferred voice: first person ("I built…") vs. a neutral third-person descriptive tone? (Assumption: first person, matching a personal portfolio.)
