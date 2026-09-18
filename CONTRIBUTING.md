# Contributing to AI Exploration

Thanks for helping this stay a calm place to learn AI.

## Suggest a link

Anyone can suggest one AI link at a time. Open a GitHub issue with the `suggest-link` template and include:

- the exact link, pasted in full
- publisher or lab name when known
- one line on why the link matters to you
- optional PDF link when the source is a paper

Suggested links stay in Issues until review. They do not render on the site on their own. This keeps quality stable.

## What happens next

The owner session uses the `ai-exploration` skill to:

1. read the source with care
2. create `content/entries/<slug>.md`
3. update `content/library.json`
4. run `npm run generate:readme`
5. run `npm run validate`, `npm run build`, and `npm run lint`

## Style for rendered notes

- Short sentences, one idea at a time
- Plain words, calm tone
- No em dash and no exclamation mark
- Short bullets, each under about 20 words when possible
- One Mermaid flow when the source has steps
- Exact source link at the bottom
- Images only with attribution under `public/images/<slug>`

## Local checks for code changes

```bash
npm install
npm run validate
npm run build
npm run lint
```

Please keep slugs stable once published. Do not rename a published route.
