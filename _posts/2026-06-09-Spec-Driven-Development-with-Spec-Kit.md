---
title: "Spec-Driven Development with GitHub Spec Kit"
excerpt: "Designing and building a security CLI entirely spec-first — every feature specified, planned, and broken into tasks before a line of code."
tags:
  - spec-driven-development
  - python
  - security
  - cli
  - github-spec-kit
---

## Spec-Driven Development with GitHub Spec Kit

> **TL;DR** — I built [`check-unprotected-keys`](https://github.com/jahnog/check-unprotected-keys) — a Python CLI that scans your folders for private keys left unencrypted or protected with an empty passphrase, so you can find and lock them down — and I built the whole thing *spec-first* with GitHub Spec Kit. The real goal was to learn spec-driven development by shipping a complete, packaged tool with it.
>
> **Stack** — Python 3.12, GitHub Spec Kit, `uv`, clean/hexagonal architecture, pytest (contract tests), PyInstaller, PyPI
>
> **Links** — [Source](https://github.com/jahnog/check-unprotected-keys)

I wanted to understand *spec-driven development* properly, not from a blog skim but by taking a real project all the way through it. [GitHub Spec Kit](https://github.com/github/spec-kit) is the tooling for exactly that: instead of jumping straight to code, you move through explicit phases — a **specification** of what the feature must do, a **plan** for how, a breakdown into concrete **tasks**, and only then the implementation — with the AI agent working against those artifacts at every step. The repository shows the method in the open: each of the five features lives under `specs/`, and every one carries its own `spec.md`, `plan.md`, `tasks.md`, plus `contracts/`, a `research.md`, a `data-model.md`, and a requirements `checklist`. The code is downstream of the specs, which is the whole point.

The project I chose to build that way is a small but genuinely useful security utility. `check-unprotected-keys` scans a set of configured folders for private key material — PEM, OpenSSH, and PuTTY keys, plus key blocks embedded in text files — and flags the ones that are **unprotected or guarded only by an empty passphrase**. It prints clean, absolute paths for the affected files and keeps its other output limited to operator-safe summaries and remediation guidance, so it drops straight into a script or a pre-commit-style check. It's deliberately bounded: it does *not* try to be a generic secret scanner hunting for API tokens and passwords — it does one job, on key material it actually understands, and does it precisely.

Forcing every feature through a specification first changed how the code came out. The implementation landed as a clean, layered architecture — a `domain` of pure classification logic, `services` that orchestrate a scan, and `adapters` for the filesystem, key parsing, and reporting — because the contracts and data models were nailed down before any code committed to a shape. The CLI behaviour is pinned by **contract tests** rather than left to chance, and the tool ships the way a real one should: installable from PyPI (`pip install check-unprotected-keys`), via `pipx`, or as a standalone executable, with `uv` driving reproducible development and releases.

What I took away is that spec-driven development front-loads the thinking. The slow, ambiguous part — *what should this actually do, and how will I know it's right?* — gets resolved on paper where it's cheap to change, and the coding phase becomes comparatively mechanical and well-scoped. For a solo project it's more ceremony than a quick script needs, but as a way to get a coding agent to build something coherent and maintainable, the discipline paid for itself.

[Browse the specs and source on GitHub](https://github.com/jahnog/check-unprotected-keys)
