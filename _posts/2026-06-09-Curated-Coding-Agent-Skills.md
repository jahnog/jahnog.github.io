---
title: "A Searchable Registry of Coding-Agent Skills"
excerpt: "A high-trust catalog of software-engineering and security agent skills with fast full-text search — built as a zero-backend static site."
header:
  teaser: /assets/images/curatedskills.jpg
featured: true
tags:
  - javascript
  - search
  - static-site
  - coding-agents
  - security
  - spec-driven-development
demo: https://jahnog.github.io/CuratedSkills/
source: https://github.com/jahnog/CuratedSkills
---

> **TL;DR** — I built [CuratedSkills](https://github.com/jahnog/CuratedSkills): a hand-curated registry of high-trust agent skills for **software engineering and security** — specs, tests, review, delivery, Dependabot PRs, static analysis, and security MCP servers — with a fast, minimalistic full-text search, served as a fully static site.
>
> **Stack** — Node.js 20+, JavaScript, MiniSearch, YAML, GitHub Pages, GitHub Actions
>
> **Links** — [Live search](https://jahnog.github.io/CuratedSkills/) · [Source](https://github.com/jahnog/CuratedSkills)

![CuratedSkills search UI](/assets/images/curatedskills.jpg)

As coding agents took off, the *skills* that extend them — small, reusable capability definitions — started piling up across scattered repositories with no good way to find the trustworthy ones. CuratedSkills is my answer: an opinionated registry of **high-trust** skills for software engineering *and* security, with a search box that actually makes the catalog usable.

The content is a **human-edited YAML catalog** — `skills.yaml`, `repositories.yaml`, and supporting `trust-tiers.yaml` and `categories.yaml` — so every entry is deliberately curated and tagged with a trust tier (highest / high / medium) and a category. Navigation always opens the **skill's folder** on GitHub, with a secondary link to its primary file (`SKILL.md`, `README.md`, or `action.yml`). Those folder URLs are *derived* from the file URLs at build time rather than hand-authored, so they cannot drift out of sync.

The interesting engineering is how that becomes a searchable site without any server. A Node.js build pipeline validates the catalog schema and checks that every remote file URL still resolves, fetches each skill's actual content from its source repository, builds a [MiniSearch](https://github.com/lucaong/minisearch) full-text index at **build time**, and emits it as a static `index.json` alongside a minimal, dark-first UI. The result deploys to GitHub Pages through a GitHub Actions workflow, and search runs entirely in the browser against the prebuilt index — **no backend, no database, nothing to keep running**.

v1.2.0 widened the catalog beyond Dependabot, SAST, and MCP. It now covers **Define & Plan**, testing, debugging, code quality, architecture, and delivery — Superpowers TDD, GitHub Spec Kit, OpenSpec, Addy Osmani's spec-driven and incremental-implementation skills — next to Trail of Bits review tooling, NVIDIA SkillSpector, Semgrep, and the rest. Lower-fit and medium-trust sources were pruned so the list stays small and opinionated. The live search is the inventory; the site is just the cheapest way to keep it findable.

[Try the live search](https://jahnog.github.io/CuratedSkills/) · [Source on GitHub](https://github.com/jahnog/CuratedSkills)
