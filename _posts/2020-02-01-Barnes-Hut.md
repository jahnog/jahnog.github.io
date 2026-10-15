---
title: "Barnes-Hut N-Body Simulation"
excerpt: "An O(n log n) N-body galaxy simulation in Scala, running in the browser with Scala.js and on the JVM."
header:
  teaser: /assets/images/barnes-hut.jpg
tags:
  - scala
  - scala-js
  - simulation
  - physics
  - algorithms
demo: https://jnbigdatabarneshut.s3.amazonaws.com/index.html
source: https://github.com/jahnog/barnes-hut-web
---

Stack: Scala 2.12, Scala.js, sbt, Vite, Swing

The simulation shows two galaxies of stars that drift toward each other, pull on each other, and collide. Every body attracts every other body, so computing all the forces directly costs O(n²) per step. That gets slow quickly as the number of bodies grows.

The Barnes-Hut algorithm, named after Josh Barnes and Piet Hut, brings the cost down to O(n log n). It divides space recursively into a quadtree. When a group of bodies is far enough away, it treats the group as one mass at its center of mass. The parameter θ sets what counts as far enough, and this implementation uses θ = 0.5. The gravity physics uses Plummer softening, which keeps the force finite when two bodies get very close.

The code is Scala, built with an immutable quadtree and an 8×8 sector matrix. The same simulation runs in the browser through Scala.js, which is the [live demo](https://jnbigdatabarneshut.s3.amazonaws.com/index.html), and on the JVM in a Swing window. The JVM build also has a parallel implementation. The test suite runs on both platforms.

[Two Galaxies simulation using Barnes-Hut](https://jnbigdatabarneshut.s3.amazonaws.com/index.html)
