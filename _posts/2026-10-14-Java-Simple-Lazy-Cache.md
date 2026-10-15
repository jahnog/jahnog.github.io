---
title: "Java Simple Lazy Cache"
excerpt: "A single-flight caller: one factory per key while the call is in flight, a shared future for the waiters, and no stored result."
date: 2026-10-14 12:01:00 -0300
header:
  teaser: /assets/images/java-simple-lazy-cache.jpg
tags:
  - java
  - concurrency
  - gradle
source: https://github.com/jahnog/JavaSimpleLazyCache
---

Stack: Java 11 bytecode, Gradle wrapper, JUnit 5, JaCoCo, PIT

When many threads ask for the same expensive value at the same time, only one of them should compute it. [`SingleFactoryCaller<T>`](https://github.com/jahnog/JavaSimpleLazyCache) is a thread-safe single-flight caller for that case. Callers that ask for the same key before the call finishes share one `CompletableFuture`. The key is removed when the future completes, successfully or not, so the next call runs the factory again. Results are not retained. A throw, including an `Error`, or a null return becomes a failed future, and `getOrAddAsync` still returns that future.

The pending map is a `ConcurrentHashMap`, and `putIfAbsent` keeps the first future for a key. A null key, an empty key, a key whose `trim` is empty, or a null factory is rejected. `clear()` drops every in-flight entry. Futures already handed to callers still complete. `getPendingTasksCount` returns how many keys still have a call in flight. `Main` is a small command-line sample, and the tests do not cover it.

The build releases Java 11 bytecode through the Gradle wrapper, so a JDK 11 or newer is enough and a separate Gradle install is not required. `./gradlew test`, `./gradlew jacocoTestReport`, and `./gradlew pitest` write the JUnit results, the JaCoCo HTML and Cobertura files, and the PIT report under `build/`. The reports are not published online. The same single-flight idea in C# is [.NET Simple Lazy Cache](/Net-Simple-Lazy-Cache/).

[Source on GitHub](https://github.com/jahnog/JavaSimpleLazyCache) · [The same idea in C#](/Net-Simple-Lazy-Cache/)
