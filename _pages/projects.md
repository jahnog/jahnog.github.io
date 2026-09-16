---
title: "Projects"
permalink: /projects/
layout: archive
author_profile: false
entries_layout: grid
classes: page-projects
---

Selected work in cited RAG, spec-driven tools, and agent-skill infrastructure,
plus earlier projects in machine learning, simulation, and data analysis. Each
card links to a write-up, and to a live demo or source when one exists.

<div class="entries-grid">
  {% for post in site.posts %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>
