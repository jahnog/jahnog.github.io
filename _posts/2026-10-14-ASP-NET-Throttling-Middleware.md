---
title: "In-Process Throttling for ASP.NET Core"
excerpt: "ASP.NET Core middleware with two in-process gates: a full total slot returns 429 at once, and a full active slot waits, then returns 429."
date: 2026-10-14 12:04:00 -0300
header:
  teaser: /assets/images/throttling-middleware.jpg
tags:
  - csharp
  - aspnet-core
  - dotnet
source: https://github.com/jahnog/ThrottlingMiddlewareNet
---

> **TL;DR** — Middleware for ASP.NET Core on .NET 10. One configured rule admits each request through a total gate and an active gate. A full total gate returns 429 immediately. A call that holds a total slot and has no active slot waits, then returns 429.
>
> **Stack** — C#, ASP.NET Core, .NET 10, xUnit
>
> **Links** — [Source](https://github.com/jahnog/ThrottlingMiddlewareNet)

Register it with `AddThrottling`, then add `UseThrottling` after `UseRouting`. Total counts requests that are running or waiting. Active counts requests inside the rest of the pipeline. The wait is `maxSleep`. If it expires, the call gets 429 and the total slot is released. `Retry-After` is the rule period: 60 seconds for a minute, 3600 for an hour, and 86400 for a day. The gates do not reset when that period ends. This is a bulkhead, not a counter of calls per minute. The gates live in the process, so ten replicas enforce the limit ten times.

The first matching rule wins: an endpoint rule whose `METHOD /path` matches the route pattern, otherwise a `remote_ip` rule with its own gates per address, otherwise a non-default global rule, otherwise the required default global rule. A more specific rule replaces the default. It does not also consume the default. The library reads `Connection.RemoteIpAddress` and does not parse `X-Forwarded-For`.

`samples/CatalogApi` is a small catalog on this machine, with `GET /items`, `POST /orders`, and `GET /work`. There is no public page for it.

[Source on GitHub](https://github.com/jahnog/ThrottlingMiddlewareNet)
