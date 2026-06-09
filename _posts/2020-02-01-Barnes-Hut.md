---
title: "Barnes-Hut N-Body Simulation"
excerpt: "An O(n log n) N-body galaxy simulation implemented in Scala.js."
tags:
  - scala
  - scala-js
  - simulation
  - physics
  - algorithms
---
## ScalaJS simulation of the Barnes-Hut approximation to solve the N-Bodies problems

> **TL;DR** — An interactive N-body galaxy simulation that runs in the browser, using the Barnes-Hut quadtree approximation to bring the cost of computing gravitational forces down from O(n²) to O(n log n). Written in Scala and compiled to JavaScript.
>
> **Stack** — Scala, Scala.js, quadtree spatial partitioning
>
> **Links** — [Live demo](https://jnbigdatabarneshut.s3.amazonaws.com/index.html) · [Source](https://github.com/jahnog/barnes-hut-web)

The Barnes–Hut simulation (named after Josh Barnes and Piet Hut) is an approximation algorithm for performing an n-body simulation. It is notable for having order O(n log n) compared to a direct-sum algorithm which would be O(n2)

I built this to watch gravity play out in the browser — an interactive N-body simulation where something like two galaxies of stars drift, pull on each other, and collide, with every body attracting every other one. The catch with N-body problems is that computing all the pairwise forces directly costs O(n²), which falls apart as the number of bodies grows. The Barnes-Hut approximation gets around that by recursively carving space into a quadtree and treating a faraway cluster of bodies as a single centre of mass, which brings the cost down to O(n log n). I wrote it in Scala and compiled it to JavaScript with Scala.js, so the whole thing runs live in the browser with nothing to install — a small but satisfying example of how the right spatial data structure can turn an intractable simulation into one you can actually sit back and watch unfold.

[Two Galaxies simulation using Barnes-Hut](https://jnbigdatabarneshut.s3.amazonaws.com/index.html)

The simulation is functional today; the natural next steps are performance optimization and parallelizing the force computation across cores to push the body count higher.