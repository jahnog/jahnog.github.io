---
title: "Spec-Driven Development with GitHub Spec Kit"
excerpt: "A Python CLI that finds unprotected private keys, built spec-first with GitHub Spec Kit: spec, plan, and tasks before code."
featured: true
header:
  teaser: /assets/images/spec-kit.jpg
tags:
  - spec-driven-development
  - python
  - security
  - cli
  - github-spec-kit
source: https://github.com/jahnog/check-unprotected-keys
---

Stack: Python 3.12, GitHub Spec Kit, `uv`, clean/hexagonal architecture, pytest (contract tests), PyInstaller, PyPI

I built [`check-unprotected-keys`](https://github.com/jahnog/check-unprotected-keys), a small Python security CLI, to learn spec-driven development on a real tool, from the first spec to a release on PyPI. [GitHub Spec Kit](https://github.com/github/spec-kit) splits each feature into phases: a specification of what it must do, a plan for how, a list of tasks, and then the code. The coding agent works from those files at each step. The repository keeps them in the open. Each of the five features has a folder under `specs/` with `spec.md`, `plan.md`, `tasks.md`, `research.md`, `data-model.md`, a `contracts/` folder, and a requirements checklist.

The tool scans configured folders for private keys: PEM, OpenSSH, and PuTTY files, plus key blocks inside text files. It reports the keys that have no passphrase or an empty one. It prints the absolute path of each affected file and keeps its other output to operator-safe summaries and remediation guidance, so a script or a pre-commit-style check can use it. It does not look for API tokens or passwords. It only handles key formats it can parse.

The code follows the specs. A `domain` package holds the pure classification logic, `services` run a scan, and `adapters` handle the filesystem, key parsing, and reports. The contracts and data models existed before the code, and contract tests pin the CLI behavior. The tool installs from PyPI (`pip install check-unprotected-keys`), with `pipx`, or as a standalone executable. `uv` runs development and releases.

Spec-driven development moves the hard questions to the start: what the tool should do, and how to tell that it works. Answering them in text, where changes are cheap, made the coding phase smaller and more predictable. For a tool this size it is more process than needed. With a coding agent writing much of the implementation, it kept the code consistent.

[Browse the specs and source on GitHub](https://github.com/jahnog/check-unprotected-keys)
