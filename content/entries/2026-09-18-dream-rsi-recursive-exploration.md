---
slug: "2026-09-18-dream-rsi-recursive-exploration"
title: "Dream RSI teaches agents to improve how they explore"
source_url: "https://www.dream-rsi.com/assets/dream-rsi.pdf"
source_canonical: "https://arxiv.org/abs/2609.14858"
publisher: "arXiv"
published_on: "2026-09-14"
topics: ["agents", "research paper", "recursive improvement"]
kind: "research-paper"
summary_1_line: "Dream RSI improves the search plan itself, not only the final answer."
pdf_url: "https://www.dream-rsi.com/assets/dream-rsi.pdf"
cover_image: ""
---

## What happened in 3 lines

- Researchers shared Dream RSI, a way for coding agents to search better over time.
- The direct PDF link did not render as text here, so this note uses the arXiv page.
- The core idea is to train the explore plan, then reuse past runs as practice worlds.

## Why it matters for you

- Agents often fail from weak search, not weak coding skill.
- Better explore plans can save time and compute on long tasks.
- The method leaves the base coding agent unchanged, which is easy to adopt.

## Key points

- Fixed search plans break as tasks grow more complex.
- Online tuning is costly since each test run takes long.
- Dream RSI adds a small control layer above the agent.
- Past search trees become replay worlds for cheap tests.
- A model suggests small edits to the explore rules.
- Scores reward good finds and punish too many tries.
- The loop targets discovery speed across hard domains.

## Simple flow

```mermaid
flowchart LR
  A[Agent searches code space] --> B[Save full search history]
  B --> C[Replay history as practice world]
  C --> D[Suggest small rule change]
  D --> E[Test change in replay]
  E --> A
```

## Terms explained

- Exploration policy means the rules for where to look next.
- Rollout means one full run of tries toward an answer.
- Replay means reusing old runs to test new rules at low cost.
- Meta search means searching for better search rules.

## What to try next

- Open the arXiv abstract page and check the method figure.
- Compare with AlphaEvolve style solution search.
- Ask how replay cost scales with task length.

## Exact source

- https://www.dream-rsi.com/assets/dream-rsi.pdf
