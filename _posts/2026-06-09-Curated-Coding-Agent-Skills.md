---
title: "A Searchable Registry of Coding-Agent Skills"
excerpt: "A curated catalog of software-engineering and security skills for coding agents, with full-text search on a static site."
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

Stack: Node.js 20+, JavaScript, MiniSearch, YAML, GitHub Pages, GitHub Actions

![CuratedSkills search UI](/assets/images/curatedskills.jpg)

Coding agents load skills: small, reusable definitions that add a capability to the agent. Skills are spread across many repositories, and it is hard to find the ones you can trust. [CuratedSkills](https://github.com/jahnog/CuratedSkills) is a short, hand-picked list of skills for software engineering and security, with a search box over their content.

The catalog is YAML edited by hand: `skills.yaml`, `repositories.yaml`, `trust-tiers.yaml`, and `categories.yaml`. Each entry has a trust tier (highest, high, or medium) and a category. A search result opens the skill's folder on GitHub, with a second link to its main file (`SKILL.md`, `README.md`, or `action.yml`). The build derives the folder URLs from the file URLs, so the two cannot disagree.

It is a static site with no server. A Node.js build validates the catalog schema, checks that every remote file URL still resolves, fetches each skill's content from its repository, and builds a [MiniSearch](https://github.com/lucaong/minisearch) full-text index. It writes the index as a static `index.json` next to a small dark UI. A GitHub Actions workflow deploys the result to GitHub Pages, and the browser searches the prebuilt index.

Version 1.2.0 widened the scope beyond Dependabot, static analysis (SAST), and MCP servers. It added planning, testing, debugging, code quality, architecture, and delivery skills: Superpowers TDD, GitHub Spec Kit, OpenSpec, and Addy Osmani's spec-driven and incremental-implementation skills. They sit next to Trail of Bits review tooling, NVIDIA SkillSpector, and Semgrep. Sources with a poor fit or medium trust were removed to keep the list short.

[Try the live search](https://jahnog.github.io/CuratedSkills/) · [Source on GitHub](https://github.com/jahnog/CuratedSkills)
