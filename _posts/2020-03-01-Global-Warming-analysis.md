---
title: "Global Warming Analysis"
excerpt: "World temperature maps and deviations from 1975 to 2015, visualized from historical climate data."
header:
  teaser: /assets/images/temperatures.jpg
tags:
  - data-analysis
  - python
  - visualization
  - climate
---

## Global Warming analysis

> **TL;DR** — Four decades of global temperature records (1975–2015) turned into colour-coded, zoomable world map tiles — computing each region's deviation from its long-run baseline so the warming signal jumps out. Built in Scala with an interactive Scala.js / Leaflet viewer.
>
> **Stack** — Scala, sbt, Scala.js, Leaflet, spatial interpolation
>
> **Links** — [Live demo](https://jnbigdatatemp.s3.amazonaws.com/index.html) · [Source](https://github.com/jahnog/capstone-observatory)

Generated global maps with the world temperatures and temperature variations since 1975 and up to 2015.

<figure>
  <video autoplay loop muted playsinline controls width="100%">
    <source src="/assets/videos/climate-evolution-1975-2015.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Temperature Deviations</figcaption>
</figure>

The idea here was to make four decades of climate data something you can actually see, rather than read as a single headline number. Working in Scala, I took historical global temperature records, computed how much each region deviated from its long-run baseline, spatially interpolated the readings, and rendered the results as colour-coded world map tiles — along with an interactive viewer that steps through the years from 1975 to 2015. Mapping the anomalies instead of the raw temperatures is what makes it click: the warming signal jumps straight out, and you can see exactly where change has been most pronounced. It turns a big, abstract dataset into an intuitive visual story you can scroll through year by year, and a quiet reminder of how much a good visualization can let the data argue for itself.

[Historic World Temperature Maps](https://jnbigdatatemp.s3.amazonaws.com/index.html)