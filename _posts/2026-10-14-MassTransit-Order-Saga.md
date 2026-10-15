---
title: "An Order Saga on Kafka and Cosmos"
excerpt: "One ASP.NET Core process runs an order state machine: Kafka carries commands and facts, and Cosmos DB stores the saga document."
date: 2026-10-14 12:03:00 -0300
header:
  teaser: /assets/images/masstransit-order-saga.jpg
tags:
  - csharp
  - masstransit
  - kafka
  - cosmos-db
demo: https://masstransitsaga.contentlabstudy.com/
source: https://github.com/jahnog/MassTransitSaga
---

> **TL;DR** — One ASP.NET Core process, on MassTransit 8.5.11 and .NET 8, runs an order state machine and a static page. Kafka carries the commands and the facts. Cosmos DB stores the saga document. The page is also hosted as a live demo.
>
> **Stack** — C#, .NET 8, MassTransit 8.5.11, Kafka, Cosmos DB, NUnit
>
> **Links** — [Live demo](https://masstransitsaga.contentlabstudy.com/) · [Source](https://github.com/jahnog/MassTransitSaga)

A caller opens the page, on port 5080 when run locally or in the [live demo](https://masstransitsaga.contentlabstudy.com/), creates an order, and sees the state, the commands that state allows, the events sent to the saga, and the facts that come back. The order moves through Submitted, Paid, Shipped, Completed, and Cancelled. The projects target `net8.0`.

MassTransit expects a broker such as RabbitMQ, Azure Service Bus, or Amazon SQS to own the saga, with Kafka only at the edge, and its transactional outbox in SQL or MongoDB. This sample keeps the saga on the Kafka rider. The in-memory bus exists only because the rider requires a bus. It has no receive endpoints. The state machine does not produce to Kafka.

The saga document and `PendingFacts` commit together. The first event inserts the document with `CreateItem`. Later transitions replace it with `ReplaceItem` and `If-Match`. A stale ETag is HTTP 412. After that commit, `PendingFactDispatcher` produces each fact and then removes it. If the process dies between those two steps, the next pass produces the fact again. The page drops a second record with a `MessageId` it already stored. Run one host: a second dispatcher can produce the same fact before either patch lands. Unit tests need no Docker. Smoke tests need Cosmos, Kafka, and Playwright, and they skip when Cosmos or Kafka is not answering.

[Try the live demo](https://masstransitsaga.contentlabstudy.com/) · [Source on GitHub](https://github.com/jahnog/MassTransitSaga)
