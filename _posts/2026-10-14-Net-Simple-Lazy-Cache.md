---
title: ".NET Simple Lazy Cache"
excerpt: "A single-flight caller in C#: one in-flight Lazy per key, removed when the call finishes, with a newer entry left in place."
date: 2026-10-14 12:02:00 -0300
header:
  teaser: /assets/images/net-simple-lazy-cache.jpg
tags:
  - csharp
  - dotnet
  - concurrency
source: https://github.com/jahnog/NetSimpleLazyCache
---

Stack: C#, `netstandard2.0` library, xUnit on `net10.0`, Coverlet, ReportGenerator, Stryker.NET

This is the C# version of a single-flight caller: concurrent callers that ask for the same key share one call to the factory instead of each running it. [`SingleFactoryCaller<T>`](https://github.com/jahnog/NetSimpleLazyCache) shares one in-flight `Lazy<Task<T>>` per key, and `T` must be a class. When the call finishes, the entry is removed and a later call runs the factory again. A cancellation token from one waiter does not cancel the shared factory.

`GetOrAddAsync` stores the shared call in a dictionary guarded by a lock. The method awaits that task, and the factory task, with `ConfigureAwait(false)`. A finishing caller removes the dictionary entry only when that entry is still the call it started. A newer entry for the same key stays.

A null or empty key throws `ArgumentException`. A null factory throws `ArgumentNullException`. A factory that returns a null task throws `InvalidOperationException`. A caller can block on the returned task while a synchronization context does not run posted work, and the call still completes. It ships as a library only, with no process of its own to run.

The library targets `netstandard2.0`. The xUnit tests target `net10.0` and run with `dotnet test`. Coverlet writes the Cobertura file, ReportGenerator writes the HTML report, and `dotnet-stryker` is the local mutation tool. GitHub Actions publishes that HTML report. The Java version of the same caller is [Java Simple Lazy Cache](/Java-Simple-Lazy-Cache/).

[Source on GitHub](https://github.com/jahnog/NetSimpleLazyCache) · [Coverage report](https://jahnog.github.io/NetSimpleLazyCache/) · [The same idea in Java](/Java-Simple-Lazy-Cache/)
