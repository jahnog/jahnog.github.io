## ADDED Requirements

### Requirement: Tracker runs only on production GitHub Pages
The site MUST include the Matomo snippet only when `jekyll.environment` is `production`. The snippet MUST initialize tracking only when `location.hostname` is `jahnog.github.io`. The tracker URL MUST remain `https://contentlabstudy.com/Mat0mo/` and the site id MUST remain `4`.

#### Scenario: Local development has no snippet
- **WHEN** the site is built or served without `JEKYLL_ENV=production`
- **THEN** the generated HTML MUST NOT contain the Matomo tracker script or noscript pixel

#### Scenario: Production build on localhost does not send hits
- **WHEN** a production-shaped build is opened on `localhost` or another non-`jahnog.github.io` host
- **THEN** the snippet MAY be present in HTML AND the JavaScript MUST return without calling `trackPageView` or loading hits for site id 4 from that host

#### Scenario: Production host tracks
- **WHEN** a production page is loaded on `https://jahnog.github.io`
- **THEN** the tracker MUST send a pageview to site id 4

### Requirement: Cookieless heartbeat tracking with canonical URLs
The production tracker MUST disable cookies, MUST enable the heartbeat timer, MUST canonicalize the page URL by stripping a trailing `/index.html` and keeping a directory trailing slash, and MUST include the official noscript pixel. The tracker MUST keep `enableLinkTracking`. The tracker MUST NOT call `setDoNotTrack` and MUST NOT send a timed engagement `trackEvent`.

#### Scenario: Heartbeat without extra actions
- **WHEN** a visitor stays on a production page for at least 15 seconds
- **THEN** the tracker MUST send a heartbeat ping AND MUST NOT record that ping as a custom event

#### Scenario: Index path collapsed
- **WHEN** a visitor opens `/index.html` on the production host
- **THEN** the tracked page URL MUST be the site origin with path `/` (no `index.html`)

#### Scenario: No first-party analytics cookies
- **WHEN** a visitor loads a production page
- **THEN** the tracker MUST have cookies disabled

### Requirement: Same-host CuratedSkills click is an event
The production tracker MUST, on click of an `a[href]` whose path is under `/CuratedSkills` on this host, push `trackEvent` with category `outbound`, action `demo`, and name equal to the destination URL. The tracker MUST NOT send outbound `trackEvent`s for other hosts.

#### Scenario: CuratedSkills click
- **WHEN** a visitor clicks a link to `/CuratedSkills/` (or a subpath) on `jahnog.github.io`
- **THEN** Matomo MUST receive an event with action `demo`

#### Scenario: External GitHub click is not an extra event
- **WHEN** a visitor clicks `https://github.com/jahnog`
- **THEN** the tracker MUST rely on link tracking for the outlink AND MUST NOT send an additional `trackEvent` for that click
