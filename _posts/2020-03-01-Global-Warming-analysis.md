---
title: "Global Warming Analysis"
excerpt: "Weather-station records from 1975 to 2015 turned into world map tiles of temperature deviations, with a Scala.js viewer."
header:
  teaser: /assets/images/temperatures.jpg
tags:
  - data-analysis
  - scala
  - scala-js
  - visualization
  - climate
demo: https://jnbigdatatemp.s3.amazonaws.com/index.html
source: https://github.com/jahnog/capstone-observatory
---

Stack: Scala 2.12, sbt, Scala.js, Leaflet, scrimage, ScalaTest, ScalaCheck

<figure>
  <video autoplay loop muted playsinline controls width="100%">
    <source src="/assets/videos/climate-evolution-1975-2015.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Temperature deviations, 1975–2015</figcaption>
</figure>

This climate data visualization turns weather-station records from 1975 to 2015 into world maps. Each map shows how far a region's temperature was from its long-run baseline. Mapping deviations instead of raw temperatures shows where the change has been largest.

The data analysis pipeline is written in Scala. It parses station metadata and yearly temperature CSV files into located readings. It interpolates temperatures over the sphere with great-circle distance and inverse-distance weighting, and a k-d tree speeds up the search for nearby stations. It builds temperature grids, computes deviations against a baseline period, maps values to a color scale, and renders images with scrimage. Then it cuts the world into web-map tiles at several zoom levels, one set for temperatures and one for deviations. Tile generation can resume after an interruption.

A Scala.js front end shows the tiles on a Leaflet map and steps through the years. The project began as the capstone of the EPFL *Functional Programming in Scala* specialization and was later reworked into a standalone project.

[Historical World Temperature Maps](https://jnbigdatatemp.s3.amazonaws.com/index.html)
