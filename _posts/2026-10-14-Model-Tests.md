---
title: "Model Tests"
excerpt: "A Python harness that gives coding agents one TypeScript shopping-cart task and changes only the instruction suffix."
date: 2026-10-14 12:05:00 -0300
header:
  teaser: /assets/images/model-tests.jpg
tags:
  - python
  - coding-agents
  - typescript
demo: https://jahnog.github.io/ModelCodeGenerationTests/
source: https://github.com/jahnog/ModelCodeGenerationTests
---

Stack: Python 3.13, `uv`, pytest, TypeScript 7.0.2

Coding agents write different code depending on the instructions they get. [ModelCodeGenerationTests](https://github.com/jahnog/ModelCodeGenerationTests) measures that difference: it gives agents the same TypeScript task and changes only the instruction suffix.

The task is a shopping cart that adds an item, shows the items, and removes an item. Each cell is one agent variant (CLI, model, and effort) and one suffix. The harness records wall-clock time, tokens, cost, tree shape, and a typecheck with the compiler pinned in the repository. A static page in `docs/`, published on GitHub Pages, shows the comparison, and you can [view the test results](https://jahnog.github.io/ModelCodeGenerationTests/) online.

That typecheck is TypeScript 7.0.2, strict, target ES2022, with no JSX and no package imports. Variants in `config/benchmark.yaml` name an agent, `grok`, `claude`, or `cursor`, plus a model and an effort. A row with `enabled: false` stays out of the run and out of the page. Suffixes are baseline instructions and architecture instructions: clean architecture, hexagonal, onion, layered, MVC, and the others listed in that file.

`uv sync` installs the project on Python 3.13 or newer. `demo` writes a badged sample for each enabled cell that has no live attempt, so the page is not empty. A sample is not a measurement and is left out of the totals. `publish` rebuilds `docs/` from saved attempts. `scan` fails if a tracked file contains a private key, a token, or a home-directory path. `serve` previews `docs/` locally at `127.0.0.1:8765` before it is published.

[View the test results](https://jahnog.github.io/ModelCodeGenerationTests/) · [Source on GitHub](https://github.com/jahnog/ModelCodeGenerationTests)
