---
title: "BCRA Mini-RAG"
excerpt: "A cited-clause RAG over Argentine FX regulation: ask what a BCRA circular says, get a Comunicación “A” citation or honest silence."
header:
  teaser: /assets/images/bcra-mini-rag.jpg
tags:
  - rag
  - python
  - fastapi
  - gradio
  - evals
  - spec-driven-development
---

## BCRA Mini-RAG

> **TL;DR** — I built [BCRA Mini-RAG](https://bcra.contentlabstudy.com/): a small RAG assistant over Argentine FX regulation (BCRA CAMEX). Ask what a circular says and you get a **cited clause** — Comunicación “A” number plus punto — or honest **silencio**. It is not a general BCRA chatbot and not legal advice. I wrote the code **spec-first** with OpenSpec.
>
> **Stack** — Python 3.11+, FastAPI, Gradio, Chroma, pydantic v2, OpenSpec, `uv`
>
> **Links** — [Live demo](https://bcra.contentlabstudy.com/) · [Source](https://github.com/jahnog/mini-rag-service)

![BCRA Mini-RAG observatory](/assets/images/bcra-mini-rag.jpg)

CAMEX is a living corpus: decades of Comunicaciones “A” plus a texto ordenado that is supposed to be the rule *hoy*. I wanted an assistant that would answer a clause question from that dump and then **stop** — cite the communication and the punto, or refuse — instead of chatting around the regulation.

The service ingests the official tipo-A catalog (Com. A 13 / 1981 → present) and the current *Exterior y Cambios* texto ordenado, refreshes when new A’s appear or the TO checksum changes, and retrieves from a Chroma index. Generation is structured — answer, deontic finding, citations. Named Com. A NNNN routes to that document, “vigente / hoy” prefers the TO plus later A’s, and guardrails log every turn. If the model cannot ground a clause, the finding is **silencio** and the UI abstains.

I built the whole thing **spec-driven**. Ingest, retrieval, query answering, guardrails, the observatory UI, and L1 evals each started as an [OpenSpec](https://github.com/jahnog/mini-rag-service/tree/master/openspec) change — proposal, requirements, design, and tasks — and only then the implementation. That is the same loop I used on [check-unprotected-keys](/Spec-Driven-Development-with-Spec-Kit/): the ports, the structured generation contract, and the silencio rule were cheap to change on paper, and the code is downstream of those artifacts.

The Gradio observatory has two layouts. **Staff (IA)** shows reasoning, a citation inspector, the guardrail log, Calidad L1, and dump dates; **Usuario** keeps question, answer, send, clear, and examples. L1 is an operator harness over a 30-question gold set with citation-id exact as the headline metric — the UI only reads the last static file; chat never scores itself. Answers are an unofficial extract of public `bcra.gob.ar` documents, dated as of the last dump refresh.

[Try BCRA Mini-RAG](https://bcra.contentlabstudy.com/) · [Source on GitHub](https://github.com/jahnog/mini-rag-service)
