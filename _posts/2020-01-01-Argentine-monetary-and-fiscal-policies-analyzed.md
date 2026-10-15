---
title: "Argentine Economic Policy Analysis"
excerpt: "Scoring 41 Argentine administrations, 1853–2025, on macroeconomic and fiscal pressure indexes, with a Python notebook and a paper."
header:
  teaser: /assets/images/presidents.jpg
tags:
  - data-analysis
  - python
  - economics
  - visualization
source: https://github.com/jahnog/still-passing-the-buck
---

## Still Passing the Buck

Stack: Python, pandas, Google Colab, World Bank World Development Indicators

![Presidents](/assets/images/top_5_presidencies.png)

The project compares the economic performance of Argentine national administrations. It extends two indexes from della Paolera, Irigoin & Bózzoli (2003), the Classical Macroeconomic Pressure Index (CMPI) and the Fiscal Pressure Index (FPI), to all 41 administrations from 1853 to 2025, scored on one 173-year frame. The inputs combine the World Bank's World Development Indicators, official Argentine sources (INDEC, BCRA, and the Ministerio de Economía), and historical series back to 1853. Known distortions in modern Argentine statistics are corrected, and each correction is documented.

The work started in 2020 as a Python and pandas notebook on Google Colaboratory. It lined up each World Bank series against the government in office at the time and charted the eras on the same axes. The repository is now the paper's replication package: the notebook builds the CMPI, FPI, and overall index series and produces the tables and figures used in the paper.

* [Open the analysis in Google Colaboratory](https://colab.research.google.com/drive/1_6WXYooZConWN1X7sxdaVeOuWESmDdQG)

## Paper

The study is published as a preprint on Zenodo and covers administrations from 1853 through 2025. It is also available as MPRA Paper No. 130511.

> Nogueira, J. H. (2026). *Still Passing the Buck: Macroeconomic and Fiscal Performance of Argentine Administrations, 1853–2025*. Zenodo. [https://doi.org/10.5281/zenodo.20692522](https://doi.org/10.5281/zenodo.20692522)

[Zenodo record](https://zenodo.org/records/20692522) · [MPRA paper](https://mpra.ub.uni-muenchen.de/id/eprint/130511)
