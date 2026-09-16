# jahnog.github.io

Personal portfolio and blog of Javier Nogueira (senior software engineer; AI systems). Built with [Jekyll](https://jekyllrb.com/) and deployed automatically to GitHub Pages at [https://jahnog.github.io](https://jahnog.github.io).

There is no theme gem and no remote theme. The site is rendered by a handful of local layouts and includes, styled by `assets/css/weblab.css` — the shared navy-and-gold template vendored from the sibling [WebLook](../WebLook) repo — plus a short `assets/css/site.css` for the few site-specific bits. No JavaScript ships with the site apart from the analytics snippet.

## Prerequisites

- GitHub Pages currently uses **Ruby 3.3.4** and **github-pages 232** ([dependency versions](https://pages.github.com/versions.json)). The Gemfile pins that gemset.
- **`./scripts/serve`** for local preview: uses Ruby 3.3.4 on PATH if present, otherwise Docker or Podman (`ruby:3.3.4`).
- **Node.js** only to run `scripts/test-theme.mjs`.
- Git (for cloning and version control).

**Platform notes**:
- **Linux/macOS**: `./scripts/serve` is the supported preview path. A local Ruby 3.3.4 install (rbenv, rvm, asdf, mise) skips the container; otherwise Docker or Podman is enough.
- **Windows**: Use WSL2 (recommended), then the same `./scripts/serve` command.

## Installation / Setup

```bash
git clone https://github.com/jahnog/jahnog.github.io.git
cd jahnog.github.io

# Gems are installed by ./scripts/serve (vendor/bundle, Ruby 3.3.4).
```

**Notes**:
- `Gemfile.lock` is intentionally ignored by `.gitignore` (common for Jekyll + GitHub Pages setups to avoid platform-specific lockfile issues).
- If you see permission or path issues with gems, run:
  ```bash
  bundle config set --local path 'vendor/bundle'
  bundle install
  ```
- The first `bundle install` may take a minute as it resolves the `github-pages` gem and its many transitive dependencies.

## Running the Development Server

Preview with the same Ruby and `github-pages` versions GitHub Pages uses:

```bash
./scripts/serve
```

Extra Jekyll flags are passed through (`./scripts/serve --drafts --future`). Use `PORT=4001 ./scripts/serve` if 4000 is taken.

- Site will be available at **http://localhost:4000** (or `PORT`).
- Changes to Markdown, layouts, includes, and CSS trigger an automatic rebuild.
- **Important**: After editing `_config.yml`, restart the server.

## Building the Static Site

```bash
# Standard build (development mode)
bundle exec jekyll build

# Production build (enables the analytics snippet)
JEKYLL_ENV=production bundle exec jekyll build

# Build with safe mode (mimics GitHub Pages restrictions more closely)
bundle exec jekyll build --safe
```

Output is written to `_site/`, which you can serve with any static file server:

```bash
python -m http.server 8000 --directory _site
```

## Testing & Validation

```bash
# Does the site build without errors?
bundle exec jekyll build

# Does the WebLook reskin still hold?
node scripts/test-theme.mjs
```

`scripts/test-theme.mjs` is the regression guard for the design system. It asserts that the vendored `weblab.css` still carries its tokens and scales, that the chrome stays flat (topbar and footer are hairline bars, not cards), that the layouts bind to the `wl-*` classes, that no trace of the old Minimal Mistakes theme has crept back in, and that the things which must not change — post permalinks, pagination paths, the plugin set, the Matomo production-host guard — are intact. Run it after any template or layout edit.

Useful extra diagnostics:

```bash
bundle exec jekyll doctor
bundle exec jekyll build --trace
```

### Responsive check

The template is mobile-first, so check narrow before wide: **375px must work first** (no horizontal overflow, everything stacked), then 1280px. Header and footer should read as hairline bars rather than floating cards.

## Debugging

```bash
# Full stack trace on errors
bundle exec jekyll serve --trace

# Extremely verbose logging
bundle exec jekyll serve --verbose

# Check what plugins and gems are active
bundle list
```

### Frequent Issues & Fixes

1. **"command not found: jekyll" or gem conflicts**
   - Always use `bundle exec jekyll ...` instead of bare `jekyll`.
   - Re-run `bundle install`.

2. **Changes to `_config.yml` not taking effect**
   - Restart the `jekyll serve` process. Some settings are only read at startup.

3. **A layout or include is missing**
   - There is no theme fallback any more: every layout named in front matter must exist under `_layouts/`. A missing one fails the build outright.

4. **"Liquid Exception" or template errors**
   - Use `--trace` to see the full backtrace.
   - Check for syntax errors in recently edited `.html`, `.md`, or Liquid includes/layouts.

5. **GitHub Pages build fails after push**
   - Reproduce locally with `JEKYLL_ENV=production bundle exec jekyll build --safe`.
   - Ensure you are not relying on plugins outside the `github-pages` whitelist (see `_config.yml` `whitelist`).
   - Check the Actions / Pages build log in the GitHub repository for the exact error.

### Environment Variables

- `JEKYLL_ENV=production` — enables production optimizations and the analytics snippet (used by GitHub Pages).

## Deployment

This site is deployed automatically by **GitHub Pages**.

- Pushing to the `master` branch triggers a build and deploy.
- No GitHub Actions workflow is configured; GitHub Pages uses its built-in Jekyll builder, which respects the `github-pages` gem in the Gemfile.

To force a rebuild on GitHub, push an empty commit:

```bash
git commit --allow-empty -m "chore: trigger GitHub Pages rebuild"
git push
```

## Project Structure (Key Paths)

```
├── _config.yml           # Jekyll configuration and site metadata
├── Gemfile               # Pins github-pages 232
├── index.html            # Home page (layout: home)
├── _posts/               # Blog posts (Markdown with YAML front matter)
├── _pages/               # Standalone pages (about, projects)
├── _data/navigation.yml  # Main nav links
├── _layouts/
│   ├── default.html      # Shell: head, header, main, footer
│   ├── home.html         # Paginated post feed
│   ├── post.html         # Article page
│   ├── page.html         # Plain content page
│   └── archive.html      # Card grid of all posts (projects)
├── _includes/
│   ├── head.html         # Meta, SEO, fonts, stylesheets
│   ├── header.html       # Wordmark + nav
│   ├── footer.html       # Links + copyright
│   ├── post-card.html    # Post card, list and grid variants
│   └── analytics.html    # Cookieless Matomo
├── assets/
│   ├── css/weblab.css    # Vendored WebLook template — edit upstream, not here
│   ├── css/site.css      # Small site-specific layer
│   ├── images/
│   └── videos/
├── scripts/
│   ├── serve             # Local preview on the GitHub Pages toolchain
│   └── test-theme.mjs    # Reskin regression guard
├── _site/                # Generated output (git-ignored)
└── README.md             # This file
```

Excluded from the published site (see `_config.yml` `exclude`): `vendor/`, `Gemfile`, `README`, `scripts/`, `openspec/`.

## Updating the shared template

`assets/css/weblab.css` is a vendored copy. Do not edit it here — change it in the WebLook repo, run its `./scripts/check.sh`, then copy the file across (or use WebLook's `scripts/sync.sh`, which only writes to consumers sitting on the `feature/apply-weblab` branch). Re-run `node scripts/test-theme.mjs` afterwards.

## Additional Notes

- Post permalinks are `/:categories/:title/`, and no post declares categories, so posts live at `/<Title-Slug>/`. Changing the permalink setting would break every existing URL.
- Analytics use a cookieless Matomo tracker (site id 4, `https://contentlabstudy.com/Mat0mo/`). The snippet ships only in `JEKYLL_ENV=production` builds and initializes only on `jahnog.github.io`.
- Campaign URLs Matomo already understands, for example `https://jahnog.github.io/?mtm_campaign=linkedin-profile` when sharing from LinkedIn.
- After deploy, confirm a `matomo.php` pageview (`send_image=1`, HTTP 200 GIF) and a later `ping=1` heartbeat in the browser network tab; LinkedIn **profile** clicks should convert, LinkedIn **share** buttons should not. Firefox must not show `NS_ERROR_DOM_NETWORK_ERR` on that URL.
- Comments are not implemented.

## License

MIT for the site code. Content (posts, pages, images) is © Javier unless otherwise noted.

---

**Quick reference (copy-paste friendly)**

```bash
# Daily development (Ruby 3.3.4 + github-pages 232, container if needed)
./scripts/serve

# Reskin guard
node scripts/test-theme.mjs

# Production build check
JEKYLL_ENV=production bundle exec jekyll build --trace

# Clean everything
bundle exec jekyll clean
rm -rf vendor .jekyll-cache
```
