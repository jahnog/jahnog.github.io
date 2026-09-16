---
title: "Install TensorFlow on 32-bit Linux"
excerpt: "Building TensorFlow from source for 32-bit (i386) Linux — Bazel, cross-compilation, and the 64-bit assumptions in the codebase."
header:
  teaser: /assets/images/tensorflow.jpg
tags:
  - tensorflow
  - machine-learning
  - linux
  - python
---
> **TL;DR** — TensorFlow only ships 64-bit binaries, so I built it from source for 32-bit (i386) Linux — a hands-on tour of Bazel, cross-compilation, and the platform assumptions baked into a large C++/Python codebase.
>
> **Stack** — TensorFlow, Bazel, C++, Python, Linux (i386)
>
> **Links** — [Build & install instructions / Source](https://github.com/jahnog/tensorflow-32-bits-linux)

![TensorFlow](/assets/images/tensorflow.jpg)

This one started as a "can it even be done?" experiment. The official TensorFlow packages only ship 64-bit binaries, so getting it running on 32-bit (i386) Linux meant building the whole thing from source. I worked through TensorFlow's Bazel build, fought past the places where it quietly assumes a 64-bit platform, and wrote down the toolchain, flags, and Python configuration that finally produced a working package on 32-bit hardware. The payoff is being able to bring modern machine-learning tooling back to the older, low-power machines everyone else has written off — and, just as much, it turned into a hands-on tour of how TensorFlow is actually compiled under the hood. If you want to try it yourself, the full build and install steps are here:

[Build & Install instructions](https://github.com/jahnog/tensorflow-32-bits-linux)