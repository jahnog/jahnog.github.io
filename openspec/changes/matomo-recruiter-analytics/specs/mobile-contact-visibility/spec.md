## ADDED Requirements

### Requirement: Sidebar GitHub and LinkedIn are visible on small viewports
On viewports below the theme `$large` breakpoint (1024px), the author-profile GitHub and LinkedIn links MUST be visible without activating a Follow control. The Follow button in `.author__urls-wrapper` MUST be hidden. `.author__urls` MUST use in-flow layout (not an absolutely positioned dropdown overlay) at those widths.

#### Scenario: Mobile sidebar shows contact links
- **WHEN** a visitor views a page with the author profile at a 375px-wide viewport
- **THEN** the GitHub and LinkedIn sidebar links MUST be visible without a tap AND MUST NOT cover the main article as a floating dropdown

#### Scenario: Desktop sidebar unchanged in structure
- **WHEN** a visitor views the same page at a 1366px-wide viewport
- **THEN** the GitHub and LinkedIn sidebar links MUST remain visible in the author profile

### Requirement: Analytics notice in the footer
The footer MUST state that analytics uses Matomo without cookies.

#### Scenario: Footer discloses cookieless Matomo
- **WHEN** a visitor views any page footer
- **THEN** the footer MUST include a short notice that analytics is Matomo and cookieless
