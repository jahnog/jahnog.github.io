---
title: "In-Process Throttling for ASP.NET Core"
excerpt: "ASP.NET Core middleware that limits concurrent requests per rule. Past the limit, a request gets 429 at once or after a short wait."
date: 2026-10-14 12:04:00 -0300
header:
  teaser: /assets/images/throttling-middleware.jpg
tags:
  - csharp
  - aspnet-core
  - dotnet
source: https://github.com/jahnog/ThrottlingMiddlewareNet
---

Stack: C#, ASP.NET Core, .NET 10, xUnit

A service can protect itself from overload by limiting how many requests it handles at once. This middleware does that inside one ASP.NET Core process on .NET 10. One configured rule admits each request through two gates: a total gate and an active gate. If the total gate is full, the request gets 429 at once. If it gets a total slot but no active slot, it waits.

Register it with `AddThrottling`, then add `UseThrottling` after `UseRouting`. Total counts requests that are running or waiting. Active counts requests inside the rest of the pipeline. The wait is `maxSleep`. If it expires, the call gets 429 and the total slot is released. `Retry-After` is the rule period: 60 seconds for a minute, 3600 for an hour, and 86400 for a day. The gates do not reset when that period ends. This is a bulkhead, not a counter of calls per minute. The gates live in the process, so ten replicas enforce the limit ten times.

The first matching rule wins: an endpoint rule whose `METHOD /path` matches the route pattern, otherwise a `remote_ip` rule with its own gates per address, otherwise a non-default global rule, otherwise the required default global rule. A more specific rule replaces the default. It does not also consume the default. The library reads `Connection.RemoteIpAddress` and does not parse `X-Forwarded-For`.

The repository includes a sample API, `samples/CatalogApi`, with `GET /items`, `POST /orders`, and `GET /work`. It runs locally; there is no hosted demo.

[Source on GitHub](https://github.com/jahnog/ThrottlingMiddlewareNet)
