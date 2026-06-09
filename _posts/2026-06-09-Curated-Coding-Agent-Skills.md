---
title: "A Searchable Registry of Coding-Agent Skills"
excerpt: "A curated, security-focused catalog of coding-agent skills with fast full-text search — built as a zero-backend static site."
header:
  teaser: /assets/images/curatedskills.jpg
tags:
  - javascript
  - search
  - static-site
  - coding-agents
  - security
---

## A Searchable Registry of Coding-Agent Skills

> **TL;DR** — I built [CuratedSkills](https://github.com/jahnog/CuratedSkills): a hand-curated registry of security-focused coding-agent skills — things like reviewing Dependabot PRs, running static analysis, and wiring up security MCP servers — with a fast, minimalistic full-text search, served as a fully static site.
>
> **Stack** — Node.js, JavaScript, MiniSearch, YAML, GitHub Pages, GitHub Actions
>
> **Links** — [Live search](https://jahnog.github.io/CuratedSkills/) · [Source](https://github.com/jahnog/CuratedSkills)

![CuratedSkills search UI](/assets/images/curatedskills.jpg)

As coding agents took off, the *skills* that extend them — small, reusable capability definitions — started piling up across scattered repositories with no good way to find the trustworthy ones. CuratedSkills is my answer: a small, opinionated registry focused on **security** skills, with a search box that actually makes the catalog usable.

The content is a **human-edited YAML catalog** — `skills.yaml`, `repositories.yaml`, and supporting `trust-tiers.yaml` and `categories.yaml` — so every entry is deliberately curated and tagged with a trust tier (highest / high / medium) and a category. The interesting engineering is how that becomes a searchable site without any server. A Node.js build pipeline fetches each skill's actual content from its source repository, builds a [MiniSearch](https://github.com/lucaong/minisearch) full-text index at **build time**, and emits it as a static `index.json` alongside a minimal, dark-first UI. The result deploys to GitHub Pages through a GitHub Actions workflow, and search runs entirely in the browser against the prebuilt index — **no backend, no database, nothing to keep running**, which is exactly what a static-hosted catalog should be.

A few design choices kept it honest. Navigation always opens the **skill's folder** on GitHub, with a secondary link to its primary file (`SKILL.md`, `README.md`, or `action.yml`) — and those folder URLs are *derived* from the file URLs at build time rather than hand-authored, so they can't drift out of sync. The build also **validates** the catalog schema and checks that every remote file URL still resolves, so a broken or moved skill is caught when the index is generated instead of by a visitor hitting a dead link.

It's a deliberately small project, but it captures a pattern I like: push all the heavy lifting into a build step so the thing you ship stays trivially cheap to host and fast to use.

[Try the live search](https://jahnog.github.io/CuratedSkills/) · [Source on GitHub](https://github.com/jahnog/CuratedSkills)
