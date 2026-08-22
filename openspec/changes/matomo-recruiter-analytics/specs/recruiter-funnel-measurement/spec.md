## ADDED Requirements

### Requirement: Matomo site 4 is this GitHub Pages origin only
Matomo site id 4 MUST be named `Javier — Portfolio`. Its URL list MUST start with `https://jahnog.github.io` and MAY keep `http://jahnog.github.io` as an alias. Unknown URLs MUST be excluded. Site search MUST be disabled. Timezone MUST remain `America/Argentina/Buenos_Aires`.

#### Scenario: HTTPS is the main URL
- **WHEN** site 4 URLs are listed
- **THEN** `https://jahnog.github.io` MUST be first

#### Scenario: Unknown hosts are dropped
- **WHEN** a hit is recorded for `127.0.0.1` or an S3 demo host against site id 4
- **THEN** Matomo MUST NOT store that hit as a visit on this property

### Requirement: Recruiter conversion goals
Site 4 MUST define these goals and no timed engagement goal:

| Name | matchAttribute | patternType | pattern | allow multiple per visit |
|---|---|---|---|---|
| Viewed Projects | `url` | `contains` | `/projects` | no |
| Viewed About | `url` | `contains` | `/about` | no |
| Clicked LinkedIn | `external_website` | `contains` | `linkedin.com/in/jntech` | yes |
| Clicked GitHub | `external_website` | `contains` | `github.com/jahnog` | yes |
| Opened a demo | `external_website` | `regex` | `colab\.research\.google\.com\|s3\.amazonaws\.com\|zenodo\.org\|doi\.org` | yes |
| Opened CuratedSkills | `event_action` | `exact` | `demo` | yes |

#### Scenario: LinkedIn profile converts
- **WHEN** a visit records an outlink whose URL contains `linkedin.com/in/jntech`
- **THEN** the Clicked LinkedIn goal MUST convert

#### Scenario: LinkedIn share does not convert the profile goal
- **WHEN** a visit records an outlink to `linkedin.com/shareArticle`
- **THEN** the Clicked LinkedIn goal MUST NOT convert

#### Scenario: Projects page converts once
- **WHEN** a visit includes a pageview whose URL contains `/projects`
- **THEN** Viewed Projects MUST convert at most once in that visit

### Requirement: Saved analysis segments
Site 4 MUST provide saved segments, enabled for all users, without auto-archive:

- `Engaged (30s+)` defined as `visitDuration>=30`
- `Mobile` defined as `deviceType==smartphone,deviceType==tablet,deviceType==phablet`
- `Outside Argentina` defined as `countryCode!=ar`

The site MUST NOT use a `visit_duration` goal or a JavaScript 30-second event to represent engagement.

#### Scenario: Engaged segment is query-time
- **WHEN** a visit’s total time is 30 seconds or more (including heartbeat-updated duration)
- **THEN** that visit MUST match the Engaged (30s+) segment when the segment is applied to a report
