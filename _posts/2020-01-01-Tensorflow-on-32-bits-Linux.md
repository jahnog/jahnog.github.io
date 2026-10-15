---
title: "Install TensorFlow on 32-bit Linux"
excerpt: "TensorFlow 1.13.2, the last release that runs on 32-bit (i686) Linux, with an installer for Debian 12 and notes for building it."
header:
  teaser: /assets/images/tensorflow.jpg
tags:
  - tensorflow
  - machine-learning
  - linux
  - python
source: https://github.com/jahnog/tensorflow-32-bits-linux
---

Stack: TensorFlow 1.13.2, Bazel, Python 3.6, Bash, Debian 12 (i386)

![TensorFlow](/assets/images/tensorflow.jpg)

The official TensorFlow packages are 64-bit only. This project keeps the machine-learning library running on 32-bit (i686) Linux PCs. Version 1.13.2 is the last release that can run there: starting with 1.14, TensorFlow requires 64-bit MKL-DNN.

The repository ships a prebuilt TensorFlow wheel and an installer for 32-bit Debian 12 (bookworm), so most people do not need to compile anything. Debian 12 comes with Python 3.11, and TensorFlow 1.13.2 only works with Python 3.6. The installer unpacks a private Python 3.6 under `~/.local/opt/tensorflow-i686` and leaves the system `python3` alone. It needs a CPU with SSE2 and about 1 GB of free disk. A small MNIST test trains for 5 epochs. On a 1.6 GHz Atom with 2 GB of RAM, one epoch takes about 3 to 4 minutes.

Building from source is documented for anyone who wants to rebuild the wheel. The Bazel build needs Java 8, OpenSSL 1.1, and Python 3.6, and Debian 12 ships none of them, so the README covers installing or building each one. On a machine with 2 GB of RAM and a slow disk, the build takes about a day and needs about 4 GB of swap. Notes for older Debian 9 and Ubuntu 16.04 and 18.04 systems are in `OLD_README.md`.

[Build & Install instructions](https://github.com/jahnog/tensorflow-32-bits-linux)
