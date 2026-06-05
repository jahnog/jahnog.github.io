---
title: "Projects"
permalink: /projects/
layout: archive
author_profile: true
entries_layout: grid
---

A selection of things I've built — machine learning, simulations, and data
analysis. Each card links to a write-up, and to a live demo or source where one
is available.

<div class="entries-grid">
  {% for post in site.posts %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>
