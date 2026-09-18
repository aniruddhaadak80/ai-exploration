---
slug: "2026-09-18-openai-misalignment-reporting-framework"
title: "OpenAI shares a plan for reporting model misalignment"
source_url: "https://openai.com/index/model-misalignment-reporting-framework"
source_canonical: ""
publisher: "OpenAI"
published_on: "2026-09-16"
topics: ["safety", "alignment", "lab report"]
kind: "lab-report"
summary_1_line: "OpenAI will publish model mistakes faster, with six first cases."
pdf_url: ""
cover_image: ""
---

## What happened in 3 lines

- OpenAI shared a new way to report when models act in odd or unsafe ways.
- The team published six first cases from training and testing in the last six months.
- Future reports will arrive sooner, even before each case is fully fixed.

## Why it matters for you

- You learn how frontier labs spot and share alignment gaps.
- You see real failure types, not only clean release notes.
- You can track if the same problem keeps coming back.

## Key points

- Reports cover training, testing, evals, and live use.
- A case can be shared even if harm is still unclear.
- Repeat cases update the first report to show weak fixes.
- Any staff member can flag a case for review.
- Cases move on ready, minor study, or slow deep study tracks.
- Slow cases with outside impact get a short early notice first.
- Each full report lists setting, date found, model level detail, and open questions.
- The plan does not replace legal or security breach duties.

## Simple flow

```mermaid
flowchart LR
  A[Staff flags odd behavior] --> B[Safety team checks facts]
  B --> C[Pick track for study]
  C --> D[Ready or minor study]
  C --> E[Slow track with early notice]
  D --> F[Publish full report]
  E --> F
```

## Terms explained

- Misalignment means the model acts against its stated goals or rules.
- Compaction summary means a short recap used to carry work into a fresh session.
- Prompt injection means hidden text that steers the model in a wrong way.
- Slow track means a longer study, often with outside parties to notify.

## What to try next

- Read one of the six linked cases end to end.
- Note which limits the authors still call open.
- Compare this plan with how other labs share safety notes.

## Exact source

- https://openai.com/index/model-misalignment-reporting-framework
