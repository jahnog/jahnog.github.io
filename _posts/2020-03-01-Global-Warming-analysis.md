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

Generated global maps with the world temperatures and temperature variations since 1975 and up to 2015.

![Temperature Deviations](/assets/images/temperatures.jpg)

The idea here was to make four decades of climate data something you can actually see, rather than read as a single headline number. Using Python for the data wrangling, I took historical global temperature records, computed how much each region deviated from its long-run baseline, and rendered the results as colour-coded world maps — along with an interactive viewer that steps through the years from 1975 to 2015. Mapping the anomalies instead of the raw temperatures is what makes it click: the warming signal jumps straight out, and you can see exactly where change has been most pronounced. It turns a big, abstract dataset into an intuitive visual story you can scroll through year by year, and a quiet reminder of how much a good visualization can let the data argue for itself.

[Historic World Temperature Maps](https://jnbigdatatemp.s3.amazonaws.com/index.html)