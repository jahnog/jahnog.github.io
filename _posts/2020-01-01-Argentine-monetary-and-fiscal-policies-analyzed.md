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

## Still passing the Buck

> **TL;DR** — A data-driven comparison of how successive Argentine administrations actually performed economically, ranking them on World Bank development indicators (GDP growth, inflation, public debt) instead of arguing about it.
>
> **Stack** — Python, pandas, Google Colab, World Bank World Development Indicators
>
> **Links** — [Run the notebook](https://colab.research.google.com/drive/1_6WXYooZConWN1X7sxdaVeOuWESmDdQG) · [Source](https://github.com/jahnog/still-passing-the-buck) · [Paper](https://zenodo.org/records/20651731)

An Economic Performance comparison between Argentine Government Administrations using World Bank Development Indicators dataset.

![Presidents](https://raw.githubusercontent.com/jahnog/still-passing-the-buck/refs/heads/main/ranking_top5.png)

I wanted to compare how successive Argentine administrations actually performed economically, rather than argue about it, so I pulled the World Bank's World Development Indicators and let the numbers do the talking. Working in a Python and pandas notebook on Google Colaboratory, I loaded the key macroeconomic series — things like GDP growth, inflation, and public debt — lined each one up against the government that was in office at the time, and charted them so the different eras sit side by side on the same axes. What makes the subject so tempting is Argentina's habit of lurching between boom and bust: once decades of indicators share a timeline, the patterns are hard to look away from, and it becomes clear how each approach played out — which is exactly why I called it *"Still passing the Buck."* You can dig into the full analysis in the notebook:

* [Open the analysis in Google Colaboratory](https://colab.research.google.com/drive/1_6WXYooZConWN1X7sxdaVeOuWESmDdQG)

## Paper

The full study is published as a preprint on Zenodo:

> Nogueira, J. H. (2026). *Still Passing the Buck: Macroeconomic and Fiscal Performance of Argentine Administrations, 1853–2025*. Zenodo. [https://doi.org/10.5281/zenodo.20651731](https://doi.org/10.5281/zenodo.20651731)