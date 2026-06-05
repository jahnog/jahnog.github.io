## 1. Argentine Economic Policy Analysis

- [x] 1.1 Read `_posts/2020-01-01-Argentine-monetary-and-fiscal-policies-analyzed.md` and its linked Colab notebook context
- [x] 1.2 Added what/how/why prose (comparison goal, World Bank indicators + Python/pandas approach, why it matters), keeping the existing image and Colab link (145 words)
- [x] 1.3 Referenced its tags naturally (data-analysis, python/pandas, economics, visualization)

## 2. Install TensorFlow on 32-bit Linux

- [x] 2.1 Read `_posts/2020-01-01-Tensorflow-on-32-bits-Linux.md` and the linked GitHub build instructions
- [x] 2.2 Added what/how/why prose (building from source for an unsupported 32-bit target, the approach, why it's useful), keeping the existing image and GitHub link (136 words)
- [x] 2.3 Referenced its tags naturally (tensorflow, machine-learning, linux, python). NOTE: "Bazel build system" inferred from domain knowledge — confirm if you want it removed/changed

## 3. Barnes-Hut N-Body Simulation

- [x] 3.1 Read `_posts/2020-02-01-Barnes-Hut.md` and the linked live demo
- [x] 3.2 Added what/how/why prose (N-body gravity sim, Barnes-Hut quadtree O(n log n), Scala.js in the browser), keeping the existing demo link (182 words). NOTE: kept the existing "Alpha / not optimized" status verbatim — update if no longer accurate (open question)
- [x] 3.3 Referenced its tags naturally (scala, scala-js, simulation, physics, algorithms)

## 4. Global Warming Analysis

- [x] 4.1 Read `_posts/2020-03-01-Global-Warming-analysis.md` and the linked temperature maps demo
- [x] 4.2 Added what/how/why prose (mapping 1975–2015 temperatures/anomalies, the data + visualization approach, what the maps reveal), keeping the existing image and demo link (125 words)
- [x] 4.3 Referenced its tags naturally (data-analysis, python, visualization, climate)

## 5. Verification & QA

- [x] 5.1 Confirmed each post has ≥120 words of distinct what/how/why prose (145 / 136 / 182 / 125)
- [x] 5.2 Rebuilt (`bundle exec jekyll build`, clean) — all four posts render; images and demo/source links (Colab, GitHub, both S3 demos) resolve
- [x] 5.3 Front matter/filenames untouched; permalinks unchanged (all four still at their original `/:title/` URLs)
- [x] 5.4 No fabricated metrics introduced. Two inferred-from-domain details flagged for confirmation: TensorFlow "Bazel" build system, and Barnes-Hut "Alpha" status kept as-is
