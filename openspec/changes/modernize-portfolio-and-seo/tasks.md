## 1. Local dev setup & baseline

- [x] 1.1 Install the toolchain (Ruby dev headers, Bundler) and run `bundle install` with a local `vendor/bundle` path
- [x] 1.2 Run `bundle exec jekyll serve` and confirm the current site builds and loads at http://localhost:4000
- [x] 1.3 Add `vendor/`, `.bundle/`, and `_site/` to `.gitignore` (already covered by existing `**/vendor/bundle`, `.bundle`, `_site`)
- [x] 1.4 Record the current built post URLs (from the sitemap) as a baseline to confirm permalinks don't change later

## 2. SEO & site metadata (`_config.yml`) — capability: seo-metadata

- [x] 2.1 Replace placeholder `title`, `description`, and `author.name` with recruiter-facing copy describing Javier as a software engineer
- [x] 2.2 Set a default social-share `og_image` and add a `teaser` fallback for posts without a specific one
- [x] 2.3 Populate `social.name`, and `social.links` (GitHub, LinkedIn) so `seo.html` emits social-profile data (`twitter.username` left blank — no handle provided)
- [x] 2.4 Add a real value (or documented placeholder) for `google_site_verification`
- [x] 2.5 Fix the `repository: jahnog/jahnog.gihub.io` typo
- [x] 2.6 Rebuild and inspect the generated `<head>`: title "Javier", real meta description, clean Open Graph tags (og:url/og:image single-slash after fixing trailing slash in `url`); no placeholder strings. NOTE: Minimal Mistakes only emits `twitter:*` tags when a Twitter handle is set — none provided, so Twitter previews fall back to Open Graph (works).

## 3. Branding & navigation — capability: site-branding

- [~] 3.1 Set the display `name` to "Javier"; avatar/logo kept as-is per user decision (deviates from site-branding "replace avatar" requirement — intentional)
- [x] 3.2 Prune empty `author.links` and `footer.links` entries so no dead social icons render (now GitHub + LinkedIn only)
- [x] 3.3 Populate `_data/navigation.yml` `main` with Projects, Posts, and About entries
- [x] 3.4 Rebuild and confirm masthead shows "Javier" + subtitle, nav labels (Projects/Posts/About) resolve to existing pages, and footer/profile show only GitHub + LinkedIn (avatar kept per user)

## 4. Project content standardization (`_posts/*.md`) — capability: project-showcase

- [x] 4.1 Add/normalize front matter for every post: `title`, `excerpt`, and `header.teaser` (5/6 have a dedicated teaser; Barnes-Hut uses the site default — flagged with a TODO for a galaxy thumbnail)
- [~] 4.2 Reused existing in-repo images as teasers; did NOT re-compress (Non-goal: no new assets authored). Barnes-Hut still needs a dedicated image.
- [x] 4.3 Added technology `tags` to each post; no `categories` added, so `:categories` permalinks are unchanged
- [x] 4.4 Each post already states what was built and links to its demo/source with descriptive link text; first images have alt text
- [x] 4.5 Rebuilt: cards render with title + teaser + excerpt; post permalinks IDENTICAL to the 1.4 baseline (verified by diff)

## 5. About & Projects pages — capabilities: project-showcase, site-branding

- [x] 5.1 Created `_pages/about.md` (`/about/`) with a professional summary, skills, and GitHub/LinkedIn links
- [x] 5.2 Created `_pages/projects.md` (`/projects/`, `layout: archive`, `entries_layout: grid`) listing all works (reverse-chronological — newest ML work first; user can curate order later)
- [x] 5.3 Rebuilt: `/about/` and `/projects/` exist and load; Projects grid renders 6 cards, each linking to its project page

## 6. Crawlability & verification — capability: seo-metadata

- [x] 6.1 Added a static `robots.txt` at the repo root allowing indexing and referencing the sitemap URL
- [x] 6.2 Confirmed `/sitemap.xml` is generated (clean absolute URLs) and `/robots.txt` serves correctly; also excluded `openspec/` from the published site so planning docs aren't indexed

## 7. Visual polish — capability: site-branding

- [x] 7.1 Added minimal, additive grid-teaser/card styling in `_sass/custom-styles/_custom.scss` (consistent teaser image size + card spacing) — no theme override churn
- [x] 7.2 Heading order verified semantic (single `h1` on home, project pages, and Projects index). Contrast relies on the theme's `dark` skin defaults (not formally audited with a contrast tool)

## 8. Verification & QA

- [x] 8.1 Verified via `bundle exec jekyll build` + generated-HTML inspection of home, Projects, About, and every project page (clean build, no errors). A live `bundle exec jekyll serve` is available for a visual pass.
- [x] 8.2 No broken internal links; all teaser/avatar images resolve to files on disk. (External demo links — Colab/S3/etc. — are pre-existing and unchanged; not liveness-checked.)
- [~] 8.3 Layout is theme-responsive (Minimal Mistakes) plus the added grid CSS; NOT pixel-tested in a real browser at 375px/1366px — recommend a quick manual check.
- [x] 8.4 Validated rendered SEO/OG tags from the build output; confirmed no remaining placeholder copy ("Some of my personal works" gone).
- [~] 8.5 Post permalinks confirmed IDENTICAL to the 1.4 baseline (diff clean). Commit & deploy intentionally left to the user.
