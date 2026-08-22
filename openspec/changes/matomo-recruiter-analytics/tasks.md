## 1. Matomo property (idSite 4)

- [x] 1.1 Update site 4: name `Javier — Portfolio`, URLs HTTPS first then HTTP alias, `excludeUnknownUrls` on, site search off
- [x] 1.2 Create the six recruiter goals (Projects, About, LinkedIn profile, GitHub, external demo regex, CuratedSkills event)
- [x] 1.3 Create segments Engaged (30s+), Mobile, and Outside Argentina (all users, no auto-archive)
- [x] 1.4 Verify via MCP: HTTPS first, six goals, three segments, no `visit_duration` goal

## 2. Tracker snippet

- [x] 2.1 Gate `_includes/analytics.html` on `jekyll.environment == "production"`
- [x] 2.2 Rewrite `_includes/analytics-providers/custom.html`: hostname guard, `disableCookies`, heartbeat, canonical URL, noscript pixel, `enableLinkTracking`, CuratedSkills `trackEvent` only
- [x] 2.3 Confirm development `jekyll build` HTML has no Matomo snippet and production build HTML has it

## 3. Mobile contacts and notice

- [x] 3.1 Override author-profile CSS so GitHub/LinkedIn are in-flow and visible below 1024px (hide Follow button, reset dropdown styles)
- [x] 3.2 Add a cookieless-Matomo line in `_includes/footer/custom.html`
- [x] 3.3 Document campaign URLs (`mtm_campaign`) and tracking confirmation in `README.md`

## 4. Verification

- [x] 4.1 `JEKYLL_ENV=production bundle exec jekyll build` succeeds; inspect home, Projects, About, and a post for snippet, footer notice, and no leftover Follow-dropdown CSS
- [x] 4.2 Check 375px and 1366px: sidebar GitHub/LinkedIn visible, no overlay on the article, footer notice readable
