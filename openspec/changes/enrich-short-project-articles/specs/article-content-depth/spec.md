## ADDED Requirements

### Requirement: Short posts describe what, how, and why
Each of the four short project posts SHALL contain original descriptive prose that covers what the project is/does, how it works (approach, tools, or techniques), and why it is interesting or what was achieved/learned. The description MUST be specific to that project (no generic boilerplate shared across posts).

#### Scenario: Reader opens a previously thin post
- **WHEN** a visitor opens any of the four short posts
- **THEN** the body explains what the project does, how it works, and why it matters — beyond the original one- or two-sentence summary

#### Scenario: Descriptions are distinct per post
- **WHEN** the four posts are compared
- **THEN** each post's added description is unique to its project, with no duplicated paragraphs across posts

### Requirement: Sufficient indexable depth
Each of the four short posts SHALL contain enough body text to be meaningfully indexable (as a guideline, at least ~120 words of prose), so search engines can generate a relevant snippet.

#### Scenario: Search engine indexes the post
- **WHEN** the post HTML is generated
- **THEN** the main content contains substantive prose (≥ ~120 words) describing the project, not just a heading, image, and link

### Requirement: Keywords reinforce the post's tags
The added prose SHALL naturally mention the technologies and topics already declared in the post's `tags`/`title`, without keyword stuffing or unnatural repetition.

#### Scenario: Body aligns with declared tags
- **WHEN** a post declares tags (e.g., `tensorflow`, `python`, `scala`)
- **THEN** those technologies/topics appear naturally within the descriptive prose

### Requirement: Existing media, links, and metadata are preserved
Enriching a post SHALL preserve its existing heading, image(s), and demo/source link(s), and MUST NOT change its front matter, filename, or permalink.

#### Scenario: Post is rebuilt after enrichment
- **WHEN** the site is rebuilt after a post is enriched
- **THEN** the post's existing images and demo/source links still render and resolve, and its permalink is unchanged from before the change

### Requirement: Honest, concise content
Added text SHALL describe only what the project genuinely does and MUST NOT invent results, metrics, or claims. Prose SHALL be concise and recruiter-skimmable (short paragraphs, plain language).

#### Scenario: No fabricated claims
- **WHEN** a description references outcomes or capabilities
- **THEN** every stated outcome is supported by what the project actually does (no invented metrics or unverifiable claims)
