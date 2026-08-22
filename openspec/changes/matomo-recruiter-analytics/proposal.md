## Why

The portfolio already sends Matomo pageviews, but the last year of data cannot tell whether a recruiter reached Projects, stayed long enough to read, or clicked GitHub or LinkedIn. Hits from localhost and an S3 demo are mixed into site id 4, bounced visits always record 0s (no heartbeat), and on viewports below 1024px the sidebar GitHub/LinkedIn links sit behind a Follow button — consistent with zero LinkedIn outclicks and ~6s mobile visits. Until measurement is clean and the conversion links are visible, we cannot improve the recruiter funnel on evidence.

## What Changes

- Restrict Matomo site 4 to `https://jahnog.github.io`, drop unknown hosts, and turn site search off.
- Add recruiter goals (Projects, About, LinkedIn profile, GitHub, external demos, CuratedSkills) and three saved segments (engaged 30s+, mobile, outside Argentina).
- Gate the tracker to production + `jahnog.github.io`, send cookieless hits with heartbeat and canonical URLs, and fire one event for same-host `/CuratedSkills` clicks.
- Show sidebar GitHub/LinkedIn on mobile (full style reset of the Follow disclosure) and add a one-line cookieless-analytics notice in the footer.
- Document Matomo campaign URLs and how to confirm tracking after deploy.

## Capabilities

### New Capabilities
- `matomo-tracking`: Production-only, cookieless Matomo tracker for this GitHub Pages host, with heartbeat, canonical page URLs, and a same-host CuratedSkills event.
- `recruiter-funnel-measurement`: Matomo property, goals, and segments that measure recruiter actions (Projects/About, LinkedIn profile, GitHub, demos) without treating share buttons or engagement timers as conversions.
- `mobile-contact-visibility`: Sidebar GitHub and LinkedIn links remain visible below the theme `$large` breakpoint instead of hiding behind Follow.

### Modified Capabilities
<!-- None. openspec/specs/ is currently empty; all capabilities above are new. -->

## Impact

- **Site:** `_includes/analytics.html`, `_includes/analytics-providers/custom.html`, `_includes/footer/custom.html`, `_sass/custom-styles/_custom.scss`, `README.md`.
- **Matomo (idSite 4):** `SitesManager.updateSite`, six `Goals.addGoal`, three `SegmentEditor.add`. Tracker URL and site id stay the same.
- **Dependencies:** none added; GitHub-Pages-safe; no new JS bundle.
- **Recruiter appeal:** conversion links are visible on the phones recruiters actually use, and later traffic can show whether they reached Projects and clicked GitHub or LinkedIn.

## Non-goals

- No homepage / Projects / About content redesign.
- No cookie-consent UI, `setDoNotTrack`, custom dimensions, JS 30s engagement events, or a `visit_duration` goal.
- No tracking of S3 / Colab / CuratedSkills *as this site*; no edits to the Climate Observatory demo.
- No owner-IP exclusion unless provided at apply time.
- No Google Analytics, Tag Manager, heatmaps, or session recording.
- No permalink, tracker URL, or site-id changes.
