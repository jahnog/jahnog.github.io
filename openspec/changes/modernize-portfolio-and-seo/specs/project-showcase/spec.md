## ADDED Requirements

### Requirement: Every work has complete front matter
Each work in `_posts/` SHALL declare, in YAML front matter, a `title`, an `excerpt` (1–2 sentence summary), and a teaser/header image. The page title MUST NOT be derived solely from the filename.

#### Scenario: A project listing card renders fully
- **WHEN** a project appears in any listing (home, Projects index, archives)
- **THEN** the card shows a human-written title, a teaser image, and an excerpt — with no missing image placeholder and no filename-derived title

#### Scenario: Front matter is present and valid
- **WHEN** the site is built
- **THEN** every file in `_posts/` parses with a `title`, `excerpt`, and teaser image field, and the build completes without front-matter errors

### Requirement: Works are framed as outcome-focused projects
Each project page SHALL communicate what was built, the technologies/skills demonstrated, and a link to the live demo or source where one exists, rather than reading as an undated blog note.

#### Scenario: Recruiter evaluates a single project
- **WHEN** a visitor opens an individual project page
- **THEN** the page states what was built, lists the technologies/skills involved (e.g., via tags), and provides any available demo/source link that resolves correctly

### Requirement: Projects are tagged by technology
Each project SHALL be categorized/tagged with the relevant technologies or domains (e.g., `machine-learning`, `scala`, `data-analysis`) so related work can be grouped and browsed.

#### Scenario: Browsing by technology
- **WHEN** a visitor selects a technology tag
- **THEN** the tag archive lists every project carrying that tag

### Requirement: A Projects index exists
The site SHALL provide a dedicated Projects index page that lists all works as project cards, ordered to put the strongest/most relevant work first.

#### Scenario: Recruiter wants the full body of work
- **WHEN** a visitor opens the Projects index page
- **THEN** all projects are listed as cards (title, teaser, excerpt), each linking to its project page
