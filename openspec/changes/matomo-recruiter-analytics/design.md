## Context

The site is a Jekyll GitHub Pages portfolio using Minimal Mistakes (`remote_theme`, `dark` skin). Analytics already use `site.analytics.provider: custom` and `_includes/analytics-providers/custom.html` with Matomo site id 4 at `https://contentlabstudy.com/Mat0mo/`. The snippet is the default pageview + `enableLinkTracking` tag; it is not gated on `jekyll.environment`, has no heartbeat, and does not canonicalize `/index.html`.

Matomo site 4 is named "GitHub page", main URL `http://jahnog.github.io` (HTTPS is an alias), site search on, no goals, no segments. Last-365-day reports mix `127.0.0.1:4173` and `jnbigdatatemp.s3.amazonaws.com` into this property. Sidebar GitHub/LinkedIn sit behind a Follow button below `$large` (1024px).

Constraints: GitHub-Pages-safe (no new plugins, no JS bundle), theme-aligned (extend existing includes/SCSS), keep tracker URL and site id.

## Goals / Non-Goals

**Goals:**
- Only `jahnog.github.io` production traffic is recorded on site 4.
- Recruiter actions (Projects, About, LinkedIn profile, GitHub, demos) are goals; engagement is a segment, not a conversion.
- Cookieless tracker with accurate last-page duration (heartbeat) and collapsed GitHub Pages URLs.
- GitHub/LinkedIn visible in the author sidebar on mobile without tapping Follow.

**Non-Goals:**
- Homepage/content redesign, cookie banner, custom dimensions, Tag Manager, heatmaps.
- JS 30s `trackEvent` or a `visit_duration` goal.
- Changing S3/Colab demos or this site's Matomo tracker URL / id.

## Decisions

**1. Double-gate the snippet (Liquid production + hostname).**
Wrap `_includes/analytics.html` in `jekyll.environment == "production"` (GitHub Pages always is; local `jekyll serve` is not). Inside JS, return unless `location.hostname === "jahnog.github.io"`. Rationale: a production-shaped local build or a copied snippet must not pollute site 4. *Alternative:* Liquid-only gate (fails if `_site/` is served locally or the snippet is pasted into another app). Hostname-only (still ships the script in development HTML).

The hostname gate does **not** stop the Climate Observatory S3 app, which hardcodes site id 4 in another codebase. `excludeUnknownUrls` on the Matomo property drops those hits.

**2. Cookieless tracking, no DNT, no consent banner.**
`disableCookies` before `trackPageView`. No `setDoNotTrack`. One footer line that analytics is Matomo, cookieless, first-party. Rationale: GitHub Pages has no consent backend; a banner would hurt recruiter first impression; DNT plus cookieless would drop privacy-hardened browsers we most want to count. Unique-visitor identity is weaker; visit, goal, and outlink metrics still work.

**3. Heartbeat for duration; segment for “engaged”; no duration goal or 30s event.**
`enableHeartBeatTimer(15)` pings (`ping=1`) do not count as actions on Matomo 5.13, so bounce rate stays honest while last-page time becomes real.

Do **not** `trackEvent` after 30s: events are actions and turn a one-page stay into a non-bounce.

Do **not** add a `visit_duration` goal: Matomo 5.13 `GoalManager::detectNumericGoalMatch` only runs when an Action is processed. A recruiter who reads one page and leaves may never convert. Use saved segment `visitDuration>=30` (report-time, from `visit_total_time`) plus the Length of visits report.

**4. Goals match outlinks and page URLs, not a general event map.**
`enableLinkTracking` already records GitHub, Colab, S3, Zenodo, LinkedIn share, and LinkedIn profile as outlinks. Extra `trackEvent`s would double-count actions. Goals:

| Goal | matchAttribute | patternType | pattern |
|---|---|---|---|
| Viewed Projects | `url` | `contains` | `/projects` |
| Viewed About | `url` | `contains` | `/about` |
| Clicked LinkedIn | `external_website` | `contains` | `linkedin.com/in/jntech` |
| Clicked GitHub | `external_website` | `contains` | `github.com/jahnog` |
| Opened a demo | `external_website` | `regex` | `colab\.research\.google\.com\|s3\.amazonaws\.com\|zenodo\.org\|doi\.org` |
| Opened CuratedSkills | `event_action` | `exact` | `demo` |

LinkedIn **share** (`linkedin.com/shareArticle`) must not convert the profile goal.

**5. One same-host event for CuratedSkills.**
`https://jahnog.github.io/CuratedSkills/` is the same host, so `enableLinkTracking` will not create an outlink. A delegated click listener on paths under `/CuratedSkills` sends `_paq.push(['trackEvent', 'outbound', 'demo', url])`. No other events.

**6. Canonicalize GitHub Pages paths in the tracker.**
Before `trackPageView`, `setCustomUrl` to origin + pathname with `/index.html` stripped and a trailing slash kept. Collapses `/` vs `/index.html` without changing permalinks.

**7. Matomo property cleanup via API, not the UI.**
`SitesManager.updateSite`: name `Javier — Portfolio`; urls HTTPS first then HTTP alias; `excludeUnknownUrls` true; `siteSearch` false. Do not add S3/localhost as aliases.

**8. Mobile contact visibility via CSS reset, not a new sidebar.**
Below `$large`, `.author__urls` is `position: absolute` with a dropdown. The override copies the existing desktop rules at all breakpoints and hides `.author__urls-wrapper button`. Footer links already show; this unhides the sidebar. No JS change, no new markup.

## Risks / Trade-offs

- **Cookieless unique visitors are inflated** → Judge funnel by visits, duration, goals, and outlinks, not returning-visitor counts.
- **Owner traffic in Argentina still looks “engaged”** → Optional `excludedIps` later; “Outside Argentina” is a heuristic, not identity.
- **`excludeUnknownUrls` drops demo hosts from this property** → Intended. Those apps need their own site ids if they want analytics.
- **CuratedSkills event is an extra action** → Only fires on an actual click, which is already not a bounce.
- **Absolute dropdown leftover if CSS is incomplete** → Reset position, border, shadow, and pseudo-arrows; verify 375px and 1366px.
- **Heartbeat 15s requests** → Tiny `matomo.php` pings; no layout shift (script stays at end of body).

## Migration Plan

1. Update Matomo site 4, then create goals and segments (takes effect immediately; historical pollution stays in old reports).
2. Ship the tracker, footer notice, CSS, and README; GitHub Pages production build picks them up.
3. Confirm locally: development HTML has no snippet; production build has it; host-guard no-ops on localhost.
4. After deploy: pageview + heartbeat ping, LinkedIn profile vs share, GitHub outlink, mobile sidebar.

Rollback: revert the git commit for site files; delete the new goals/segments and set `excludeUnknownUrls` false if needed.

## Open Questions

- Public IP to exclude as owner traffic (optional, not blocking).
