---
title: "Argentine Economic Policy Analysis"
excerpt: "Comparing the economic performance of Argentine governments using World Bank development indicators."
header:
  teaser: /assets/images/presidents.jpg
tags:
  - data-analysis
  - python
  - economics
  - visualization
---

## Still Passing the Buck

> **TL;DR** — A data-driven comparison of how successive Argentine administrations actually performed economically, ranking them on World Bank development indicators (GDP growth, inflation, public debt) instead of arguing about it.
>
> **Stack** — Python, pandas, Google Colab, World Bank World Development Indicators
>
> **Links** — [Run the notebook](https://colab.research.google.com/drive/1_6WXYooZConWN1X7sxdaVeOuWESmDdQG) · [Source](https://github.com/jahnog/still-passing-the-buck) · [Paper](https://zenodo.org/records/20692522)

![Presidents](/assets/images/top_5_presidencies.png)

I pulled the World Bank's World Development Indicators into a Python and pandas notebook on Google Colaboratory, lined each series up against the government that was in office at the time, and charted them so the different eras sit side by side on the same axes. Argentina's habit of lurching between boom and bust is what makes the timeline hard to look away from — which is why I called it *"Still Passing the Buck."* You can dig into the full analysis in the notebook:

* [Open the analysis in Google Colaboratory](https://colab.research.google.com/drive/1_6WXYooZConWN1X7sxdaVeOuWESmDdQG)

## Paper

The full study is published as a preprint on Zenodo. The notebook work began in 2020; the 2026 preprint covers administrations from 1853 through 2025.

> Nogueira, J. H. (2026). *Still Passing the Buck: Macroeconomic and Fiscal Performance of Argentine Administrations, 1853–2025*. Zenodo. [https://doi.org/10.5281/zenodo.20692522](https://doi.org/10.5281/zenodo.20692522)