## ADDED Requirements

### Requirement: Professional identity
The site SHALL present Javier's real display name and a professional avatar/logo in the masthead and author profile. The unrelated placeholder avatar (`the_scream_98x98.jpg`) and the non-human name ("jahnog.github.io") MUST be replaced.

#### Scenario: Identity shown in the masthead
- **WHEN** any page is rendered
- **THEN** the masthead/author area shows Javier's real name and a professional avatar or personal logo, not the placeholder painting or a URL-as-name

### Requirement: Working top navigation
The site SHALL provide a top navigation menu with links to the primary destinations (at minimum Projects, Posts, and About). Navigation entries MUST resolve to existing pages.

#### Scenario: Recruiter navigates the site
- **WHEN** a visitor uses the top navigation
- **THEN** the menu shows Projects, Posts, and About entries, each linking to a page that exists and loads without a 404

### Requirement: Populated social and contact links
The author profile and footer SHALL show only links that are configured and valid (e.g., GitHub, LinkedIn, email). Social entries with no URL MUST NOT render as dead links.

#### Scenario: Visitor checks profiles
- **WHEN** the author profile or footer is rendered
- **THEN** every displayed social/contact icon links to a valid destination, and no empty/placeholder social entries are shown

### Requirement: Consistent, polished dark theme
The site SHALL maintain a consistent, legible dark visual style across pages, with sufficient text contrast and a responsive layout on mobile and desktop.

#### Scenario: Visual consistency across viewports
- **WHEN** the home feed, Projects index, and an individual project page are viewed at mobile (375px) and desktop (1366px) widths
- **THEN** the dark theme renders consistently, text remains legible (adequate contrast), and no layout breaks or horizontal overflow occur
