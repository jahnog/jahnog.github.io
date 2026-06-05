## Context

The site is a Jekyll site on GitHub Pages using the Minimal Mistakes remote theme (`dark` skin), built with the `github-pages` gem set. Content lives in `_posts/` (6 works), `index.html` uses `layout: home` (a bare post feed), `_data/navigation.yml` is empty, and most posts have no front matter. Minimal Mistakes already ships the pieces we need — `home` and `archive` layouts, `_includes/seo.html` (Open Graph/Twitter tags), author-profile/masthead includes, and grid `entries_layout` — so the work is mostly **configuration and content**, not new code. Per the user's request, there is **no dedicated landing/splash page**; the whole site is improved uniformly in place.

Constraints: must stay GitHub-Pages-safe (only whitelisted plugins: `jekyll-paginate`, `jekyll-sitemap`, `jekyll-gist`, `jekyll-feed`, `jekyll-include-cache`); must not break existing post permalinks; customization should be minimal and theme-aligned. Some assets (professional avatar, résumé, tagline copy) require input from Javier.

## Goals / Non-Goals

**Goals:**
- A Projects index and an About page built from native theme layouts, with the existing home feed improved in place.
- Real SEO/social metadata emitted by the theme's existing `seo.html` (no new plugins).
- Every work rendered as a complete, tagged project card (title, teaser, excerpt).
- Professional branding and working navigation across every page.

**Non-Goals:**
- No dedicated landing/splash page — the home post feed stays.
- No theme swap, CSS framework, or SPA/JS redesign.
- No new technical posts authored; no permalink/domain migration.
- No analytics vendor or comments system rollout.

## Decisions

**1. Keep the existing home post feed; no dedicated landing/splash page.**
`index.html` stays on `layout: home` (author-profile sidebar + recent posts). It improves automatically as posts gain teasers/excerpts and as branding/navigation are populated — no hero, CTA banner, or `splash` layout. Rationale: the user does not want a landing page; improving the whole site uniformly is simpler, lower-risk, and theme-native. *Alternative considered:* a `splash` landing with a hero + `feature_row` (rejected per the user's request).

**2. Keep works in `_posts/`; do not introduce a `_projects` collection.**
Standardize front matter (`title`, `excerpt`, `header.teaser`, `categories`/`tags`) and build the Projects index as a `_pages/projects.md` using `layout: archive` (or a Liquid loop) with `entries_layout: grid`. Rationale: preserves existing permalinks (avoids breaking inbound links — a stated risk), avoids reworking content structure, satisfies the "no permalink migration" non-goal. *Alternative considered:* a dedicated `_projects` collection (cleaner semantics, but requires permalink changes and more churn for 6 items — not worth it now).

**3. SEO through theme config + `seo.html`, not `jekyll-seo-tag`.**
Populate `_config.yml` (`description`, `og_image`, `author.name`, `twitter.username`, `social.name`/`social.links`, `*_site_verification`) and per-post `excerpt`/`header` so the theme's `_includes/seo.html` emits accurate `<title>`, meta description, Open Graph, and Twitter Card tags. Add a static `robots.txt` at the repo root pointing to the sitemap (already produced by `jekyll-sitemap`). Rationale: zero new dependencies, fully GitHub-Pages-safe. *Alternative considered:* adding `jekyll-seo-tag` (redundant with Minimal Mistakes' own SEO include and risks duplicate tags).

**4. Branding via config + data, minimal SCSS.**
Set a real `author.name`, replace the `the_scream` avatar/logo with a professional image, prune empty `author`/`footer` social entries, and populate `_data/navigation.yml` (`Projects`, `Posts`, `About`). Any visual polish goes in the existing `_sass/custom-styles/` import as small additive rules. Fix the `repository: jahnog/jahnog.gihub.io` typo. Rationale: keeps custom CSS tiny and theme-aligned.

## Risks / Trade-offs

- **Broken inbound links if permalinks change** → Decision 2 keeps `_posts` permalinks (`/:categories/:title/`) intact; only add front matter. Verify the built URLs are unchanged before/after.
- **Missing or heavy teaser images degrade look and load time** → Source/produce per-project teasers, compress to ~600px-wide web-optimized JP/PNG/WebP, and set a default `teaser` in `_config.yml` so no card breaks. Note: adding images raises page weight — mitigate with sized, compressed assets; the theme already lazy-friendly and responsive.
- **Accessibility regressions** → Provide descriptive `alt` text for every teaser/avatar, keep heading order semantic (one `h1` per page), and verify dark-skin text contrast meets WCAG AA. Use descriptive link text (no "click here").
- **Adding `categories` to posts can spawn category archive URLs** → Use `tags` for technology labels (and/or a fixed category) to avoid permalink surprises, since `permalink` includes `:categories`.
- **Dependent on Javier-provided assets** → Ship sensible placeholders/config first; swap in the real headshot/résumé/copy when available (see Open Questions).

## Migration Plan

1. Update `_config.yml` (metadata, author, social, og_image, verification, fix repo typo).
2. Add front matter + teaser images to each `_posts/*.md`.
3. Add `_pages/about.md` and `_pages/projects.md`; populate `_data/navigation.yml`.
4. Add `robots.txt` (the home feed stays on `layout: home`).
5. Apply minimal SCSS polish.
6. Build locally (`bundle exec jekyll serve`), verify no broken links/images, check rendered SEO tags and responsive/contrast behavior, then deploy via the normal GitHub Pages push.

Rollback: changes are additive and config-level; revert the commit to restore the prior site (no data migration to undo).

## Open Questions

- Preferred public display name and one-line tagline/role (for branding, the author bio, and the SEO description)?
- Is a professional headshot/personal logo available, and should a résumé (PDF) be linked from About/profile?
- What ordering should the Projects index use (strongest/most-relevant first)?
- Confirm canonical profiles (LinkedIn `in/jntech`, GitHub `jahnog`) and whether a contact email should be public.
