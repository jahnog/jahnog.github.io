# jahnog.github.io

Personal portfolio and blog of Javier (Software Engineer & Deep Learning Enthusiast). Built with [Jekyll](https://jekyllrb.com/) using the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme. Deployed automatically to GitHub Pages at [https://jahnog.github.io](https://jahnog.github.io).

This is a static site generator project. The source lives in this repository; the rendered output is served from the `gh-pages` branch (or directly from `master` via GitHub Pages).

## Prerequisites

- **Ruby** (3.x recommended; project tested with Ruby 3.2.3). Jekyll ~3.7 is pinned via the `github-pages` gem for GitHub Pages compatibility.
- **Bundler**: `gem install bundler`
- **Node.js** (>= 0.10.0; project tested with Node 24.14.0) and **npm** (for JavaScript asset minification and banner injection).
- Git (for cloning and version control).

Optional but recommended for local development:
- A modern terminal / shell (bash, zsh, PowerShell, etc.).

**Platform notes**:
- **Linux/macOS**: Native Ruby + Node work well. Use a Ruby version manager (rbenv, rvm, asdf, mise) if you manage multiple Ruby versions.
- **Windows**: Use WSL2 (recommended) or install Ruby/Node natively via RubyInstaller / Node.js installer. Commands below use `bundle exec` and work in all environments.
- No Docker or containerized environments are configured.

## Installation / Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/jahnog/jahnog.github.io.git
cd jahnog.github.io

# Install Ruby gems (Jekyll + theme + plugins). Uses vendor/bundle by default in this repo.
bundle install

# Install Node dev dependencies (for JS build scripts).
npm install
```

**Notes**:
- `Gemfile.lock` and `package-lock.json` are intentionally ignored by `.gitignore` (common for Jekyll + GitHub Pages setups to avoid platform-specific lockfile issues).
- If you see permission or path issues with gems, run:
  ```bash
  bundle config set --local path 'vendor/bundle'
  bundle install
  ```
- The first `bundle install` may take a minute as it resolves the `github-pages` gem and its many transitive dependencies.

## Running the Development Server

Start a local web server with live reload:

```bash
# Basic serve (rebuilds on file changes)
bundle exec jekyll serve

# Serve with drafts and future-dated posts visible
bundle exec jekyll serve --drafts --future

# Serve on a custom port / host (useful in containers or when 4000 is taken)
bundle exec jekyll serve --port 4001 --host 0.0.0.0

# Verbose output + trace for debugging
bundle exec jekyll serve --trace --verbose
```

- Site will be available at **http://localhost:4000** (or the port you specified).
- Changes to Markdown, layouts, includes, Sass, and most `_config.yml` settings trigger an automatic rebuild.
- **Important**: After editing `_config.yml`, you usually need to restart the server for some settings to take effect.

## Building JavaScript Assets

The theme ships with several JS plugins that are concatenated, minified, and stamped with a banner at build time.

Available npm scripts (defined in `package.json`):

```bash
# One-time production build of assets/js/main.min.js (uglify + banner)
npm run build:js

# Watch mode: rebuild JS automatically when any source JS file changes
npm run watch:js
```

**When to run**:
- Run `npm run build:js` at least once after a fresh clone (or if `assets/js/main.min.js` is missing or stale).
- Use `npm run watch:js` in a separate terminal while developing if you are editing files under `assets/js/`.
- The Jekyll build process does **not** automatically run the JS build; you must run the npm script yourself when JS sources change.

The minified bundle is committed to the repo (under `assets/js/main.min.js`) so the site works out of the box on GitHub Pages.

## Building the Static Site

Generate the production-ready site into the `_site/` directory:

```bash
# Standard build (development mode)
bundle exec jekyll build

# Production build (applies JEKYLL_ENV=production settings, e.g. compressed HTML, analytics, etc.)
JEKYLL_ENV=production bundle exec jekyll build

# Build with safe mode (mimics GitHub Pages restrictions more closely)
bundle exec jekyll build --safe

# Clean previous build artifacts first
bundle exec jekyll clean && bundle exec jekyll build
```

Output is written to `_site/`. You can serve the static files directly with any HTTP server for testing:

```bash
# Quick static preview of the built site (Python 3)
python -m http.server 8000 --directory _site

# Or with Node
npx serve _site
```

## Testing & Validation

There are no automated unit or integration tests in this repository. Validation is performed by attempting a full site generation:

```bash
# Primary "test": does the site build without errors?
bundle exec jekyll build

# Additional diagnostics
bundle exec jekyll doctor
bundle exec jekyll build --trace
```

- `jekyll doctor` reports common configuration problems and deprecated settings.
- A successful `JEKYLL_ENV=production bundle exec jekyll build` is the closest equivalent to a production smoke test.
- The Rakefile contains a `:preview` task inherited from the Minimal Mistakes theme development workflow. It is not used for this personal site (it targets a `test/` directory that is excluded from the build). You can ignore it unless you are hacking on the theme itself.

## Debugging

### Common Commands

```bash
# Full stack trace on errors
bundle exec jekyll serve --trace

# Extremely verbose logging
bundle exec jekyll serve --verbose

# Build only (no server) with trace
bundle exec jekyll build --trace

# Check what plugins and gems are active
bundle list

# Show current Jekyll configuration (merged)
bundle exec jekyll build --config _config.yml --trace 2>&1 | head -100
```

### Frequent Issues & Fixes

1. **"command not found: jekyll" or gem conflicts**
   - Always use `bundle exec jekyll ...` instead of bare `jekyll`.
   - Re-run `bundle install`.

2. **Changes to `_config.yml` not taking effect**
   - Restart the `jekyll serve` process. Some settings are only read at startup.

3. **JavaScript not updating / `main.min.js` looks old**
   - Run `npm run build:js` (or `npm run watch:js` in another terminal).

4. **Sass / CSS not updating**
   - Delete `.sass-cache` and restart the server:
     ```bash
     rm -rf .sass-cache
     bundle exec jekyll serve
     ```

5. **"Liquid Exception" or template errors**
   - Use `--trace` to see the full backtrace.
   - Check for syntax errors in recently edited `.html`, `.md`, or Liquid includes/layouts.

6. **GitHub Pages build fails after push**
   - Reproduce locally with `JEKYLL_ENV=production bundle exec jekyll build --safe`.
   - Ensure you are not relying on gems or plugins outside the `github-pages` whitelist (see `_config.yml` `whitelist` section).
   - Check the Actions / Pages build log in the GitHub repository for the exact error.

7. **Permission or ownership errors on Linux/macOS**
   - Avoid running `bundle` or `npm` as root. Use a user-level Ruby installation or version manager.

8. **Node version too old for uglify**
   - The `uglify-js` devDependency is old but still works on modern Node. If you hit issues, try Node 18+.

### Environment Variables

- `JEKYLL_ENV=production` — enables production optimizations (used by GitHub Pages).
- `LISTEN_GEM_DEBUGGING=1` — used by the Rakefile preview task (rarely needed).

## Deployment

This site is deployed automatically by **GitHub Pages**.

- Pushing to the `master` branch triggers a build and deploy.
- No GitHub Actions workflow is currently configured (GitHub Pages uses its built-in Jekyll builder, which respects the `github-pages` gem in the Gemfile).
- The `remote_theme` setting in `_config.yml` pulls the Minimal Mistakes theme at build time on GitHub's servers.

### Manual / Preview Deployment Steps (rarely needed)

```bash
# 1. Build production site locally
JEKYLL_ENV=production bundle exec jekyll build

# 2. (Optional) Test the exact files that will be published
#    The _site directory is what GitHub Pages serves.
```

To force a rebuild on GitHub, you can push an empty commit:

```bash
git commit --allow-empty -m "chore: trigger GitHub Pages rebuild"
git push
```

## Project Structure (Key Paths)

```
├── _config.yml           # Main Jekyll configuration (theme, plugins, site metadata)
├── Gemfile / Gemfile.lock
├── package.json          # Node scripts for JS asset pipeline
├── banner.js             # Adds license/version header to minified JS
├── Rakefile              # Legacy Minimal Mistakes preview task (not used for site)
├── index.html            # Site entry point / home layout hook
├── _posts/               # Blog posts (Markdown with YAML front matter)
├── _pages/               # Standalone pages (about, projects, etc.)
├── _includes/            # Reusable Liquid partials
├── _layouts/             # Page/post layout templates
├── _sass/                # Custom Sass / theme overrides
├── assets/               # Images, JS (source + minified), videos, etc.
│   └── js/
│       ├── _main.js
│       └── main.min.js   # Generated; commit this
├── _site/                # Generated output (git-ignored; created by `jekyll build`)
├── .gitignore
└── README.md             # This file
```

Excluded from the published site (see `_config.yml` `exclude`):
- `node_modules/`, `vendor/`, `Gemfile*`, `package*.json`, `Rakefile`, `README*`, `openspec/`, test dirs, etc.

## Additional Notes

- The site uses `remote_theme` so the full Minimal Mistakes source is not vendored.
- Analytics use a cookieless Matomo tracker (site id 4, `https://contentlabstudy.com/Mat0mo/`). The snippet ships only in `JEKYLL_ENV=production` builds and initializes only on `jahnog.github.io`.
- Campaign URLs Matomo already understands, for example `https://jahnog.github.io/?mtm_campaign=linkedin-profile` when sharing from LinkedIn.
- After deploy, confirm a `matomo.php` pageview (`send_image=1`, HTTP 200 GIF) and a later `ping=1` heartbeat in the browser network tab; LinkedIn **profile** clicks should convert, LinkedIn **share** buttons should not. Firefox must not show `NS_ERROR_DOM_NETWORK_ERR` on that URL.
- Comments are disabled by default in the current configuration.
- For theme customization, refer to the [Minimal Mistakes documentation](https://mmistakes.github.io/minimal-mistakes/docs/).

## License

This site inherits the MIT license from the Minimal Mistakes Jekyll theme. Content (posts, pages, images) is © Javier unless otherwise noted.

---

**Quick reference (copy-paste friendly)**

```bash
# One-time setup
bundle install && npm install

# Daily development
bundle exec jekyll serve --drafts
# (in another terminal if editing JS)
npm run watch:js

# Production build check
JEKYLL_ENV=production bundle exec jekyll build --trace

# Clean everything
bundle exec jekyll clean
rm -rf node_modules vendor .sass-cache .jekyll-cache
```

Happy building! If you find missing commands or environment-specific gotchas, feel free to improve this README.