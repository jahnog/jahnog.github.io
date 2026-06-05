## ADDED Requirements

### Requirement: No templated section labels
The descriptive text in the four short posts SHALL NOT use templated prefixes or section labels such as "What it does", "How it works", "Why it matters", "Why it's useful", or "Why it's interesting" (in bold, as headings, or otherwise).

#### Scenario: Reader scans the description
- **WHEN** a visitor reads any of the four posts
- **THEN** the description contains none of the templated labels and instead reads as ordinary prose

### Requirement: Continuous, connected prose
Each post's description SHALL read as connected paragraphs with natural transitions, not as a list of separately labeled blocks. The what/how/why intent SHALL remain, but expressed through flowing narrative.

#### Scenario: Paragraphs flow together
- **WHEN** the description is read top to bottom
- **THEN** the paragraphs connect as a continuous explanation (the project, its approach, and its significance), without abrupt label-delimited segments

### Requirement: Substance and keywords preserved
The rewrite SHALL preserve the original information (what the project is, how it works, and why it's relevant) and keep the technologies/topics from each post's `tags`/`title` present in the prose, maintaining roughly the prior depth (≥ ~120 words of real content).

#### Scenario: Information and SEO depth retained
- **WHEN** a rewritten post is compared to its previous version
- **THEN** the same core facts and technology keywords are still present, and the prose is still substantive enough to index well

### Requirement: Media, links, metadata, and honesty preserved
The rewrite SHALL keep each post's existing heading, image(s), demo/source link(s), and front matter unchanged, MUST NOT change the filename or permalink, and MUST NOT introduce new claims or invented metrics.

#### Scenario: Post is rebuilt after the rewrite
- **WHEN** the site is rebuilt after a post is rewritten
- **THEN** the heading, images, and demo/source links still render and resolve, the permalink is unchanged, and no fabricated claims have been added
