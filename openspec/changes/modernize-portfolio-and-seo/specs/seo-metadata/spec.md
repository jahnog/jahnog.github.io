## ADDED Requirements

### Requirement: Meaningful site-level metadata
The site SHALL define a descriptive `title`, `description`, and human `author.name` in `_config.yml` that reflect Javier as a software engineer. Placeholder values ("Some of my personal works", author "jahnog.github.io") MUST be replaced.

#### Scenario: Search engine reads the home page
- **WHEN** the home page HTML is generated
- **THEN** the `<title>` and `<meta name="description">` describe Javier and his engineering focus, with no placeholder strings

### Requirement: Per-page titles and descriptions
Every generated page SHALL emit a unique, descriptive `<title>` and `<meta name="description">` derived from the page's title/excerpt.

#### Scenario: A project page is indexed
- **WHEN** an individual project page is generated
- **THEN** its `<title>` reflects the project title and its meta description reflects the project excerpt, distinct from other pages

### Requirement: Open Graph and Twitter Card metadata
Each page SHALL emit Open Graph and Twitter Card tags (title, description, type, url, and image). The site SHALL define a default `og_image` used when a page has no specific image.

#### Scenario: A page is shared on social media
- **WHEN** a project or home-page URL is shared on a platform that reads Open Graph/Twitter tags
- **THEN** the preview shows the correct title, description, and an image (page-specific or the default `og_image`)

### Requirement: Structured social-profile data
The site SHALL declare Javier's social profiles (at minimum GitHub and LinkedIn) so that person/social structured data is emitted.

#### Scenario: Profiles are discoverable in markup
- **WHEN** the page metadata is generated
- **THEN** the markup includes Javier's GitHub and LinkedIn profile links as structured/social-profile data

### Requirement: Crawlability and verification
The site SHALL serve a `robots.txt` that allows indexing and references the sitemap, expose an XML sitemap, and support search-engine site verification (e.g., `google_site_verification`).

#### Scenario: A crawler requests robots.txt
- **WHEN** a crawler requests `/robots.txt`
- **THEN** the response allows crawling of public pages and points to the sitemap URL

#### Scenario: Verification token is configurable
- **WHEN** a site-verification token is set in `_config.yml`
- **THEN** the corresponding verification `<meta>` tag is rendered in the page `<head>`
