## Why

The site is the first impression a recruiter gets of Javier as a software-engineering candidate, but today it reads as a bare blog: the home feed is an unframed list of posts, the site title/description are placeholders ("Some of my personal works", author "jahnog.github.io"), most posts have no front matter (so no real titles, excerpts, teaser images, or tags), navigation is empty, and the avatar is an unrelated painting. A recruiter skimming for a minute cannot quickly answer "who is this, what can they build, and should we talk to them?" — and the generic metadata means the site barely surfaces in search or looks broken when shared. This change uniformly improves the whole site so it reads like a modern, professional engineering CV and becomes discoverable — without adding a dedicated landing page.

## What Changes

- Improve the existing home feed and overall site presentation in place (no separate landing/splash page): better post/project cards, populated author profile, and working navigation across every page.
- Standardize every work as a polished "project": real titles, excerpts, teaser/header images, and technology tags, plus a dedicated Projects index that frames each post as an outcome ("what I built + skills demonstrated"), not just a blog entry.
- Fill in real SEO and social-sharing metadata: meaningful site title/description, per-page titles/descriptions/excerpts, Open Graph + Twitter Card images, social-profile structured data, a default `og_image`, `robots.txt`, and search-engine site verification (sitemap is already enabled via `jekyll-sitemap`).
- Refresh professional branding and navigation: a real display name and professional avatar, a working top navigation menu (Projects / Posts / About), populated social links (GitHub, LinkedIn, email), a tidy footer, and small dark-theme polish — all within the Minimal Mistakes theme.

All changes stay GitHub-Pages-safe (no new unsupported plugins) and reuse Minimal Mistakes features/includes rather than bespoke code.

## Capabilities

### New Capabilities
- `project-showcase`: Standardized, polished presentation of each work (front matter, excerpt, teaser image, tech tags, outcome-focused framing) and a Projects index page.
- `seo-metadata`: Site-wide and per-page SEO + social-sharing metadata, including Open Graph/Twitter cards, social-profile data, robots.txt, and search-engine verification.
- `site-branding`: Professional visual identity and wayfinding — display name, avatar, top navigation, social links, footer, and dark-theme polish.

### Modified Capabilities
<!-- None. openspec/specs/ is currently empty; all capabilities above are new. -->

## Impact

- **Config:** `_config.yml` (title, description, author/name, social, `og_image`, verification, defaults) — fixes the `repository` typo `jahnog.gihub.io`.
- **Content:** `_posts/*.md` front matter standardized; new `_pages/` for About and Projects index; the home feed (`index.html`) stays on `layout: home` and improves via better cards and profile.
- **Theme/markup:** Minimal Mistakes includes (`seo.html`, `masthead`, `author-profile`), `_data/navigation.yml`, `_sass/custom-styles`.
- **Assets:** professional avatar, per-project teaser images, a default social-share `og_image`; new `robots.txt`.
- **Dependencies:** none added — remains within the `github-pages` gem set; sitemap already enabled.
- **Recruiter appeal:** directly raises clarity (instant "what can they build"), credibility (no placeholders/broken cards), discoverability (search + clean social previews), and professionalism (CV-grade first impression).

## Non-goals

- No dedicated landing/splash page — the existing home post feed stays; the whole site is improved in place instead.
- No theme replacement, CSS framework, or JS-heavy redesign — Minimal Mistakes stays; customization is minimal and additive.
- No new content/projects authored beyond reframing the existing works (writing new technical posts is out of scope here).
- No paid SEO tooling, ads, comments system, or analytics vendor lock-in; no backend/serverless additions.
- No custom domain migration.
