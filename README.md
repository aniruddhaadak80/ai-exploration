# AI Exploration

A calm personal hub for daily AI learning. Each pasted AI link becomes one short note in plain words, with the exact source kept at the bottom.

This repo starts with a Next.js site plus a file database. No external database is needed for now. A move to Supabase is planned only after about 200 to 400 notes.

## How it works

Paste one AI link in OpenCode with the `ai-exploration` skill. The skill reads the source with care, then adds:

- one markdown note in `content/entries`
- one record in `content/library.json`
- updated home listing, topic filters, and this README index
- local checks for build, validation, and lint

```mermaid
flowchart LR
  A[Paste link with skill] --> B[Read source page or PDF]
  B --> C[Write plain note with flow]
  C --> D[Update library and README]
  D --> E[Run validate and build]
  E --> F[Open local route and review]
```

## Local start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for home, `http://localhost:3000/topics` for themes, and `/learn/your-slug` for one note.

## Add one link, the supported way

1. Open OpenCode in any session.
2. Invoke the global skill named `ai-exploration`.
3. Paste exactly one link from X, a lab blog, docs, arXiv, or a release page.
4. Review the new route under `/learn`.
5. Run `npm run validate`, `npm run build`, and `npm run lint` before sharing.

Anyone can suggest a link through a GitHub issue. Only the owner session with the skill adds rendered notes. See `CONTRIBUTING.md` for the issue format.

## Content style

Every note follows the same calm shape:

- What happened in 3 lines
- Why it matters for you
- Key points as short bullets
- Simple step flow with Mermaid when useful
- Terms explained in very simple words
- What to try next
- Exact source link

Notes use short sentences, plain words, no em dash, and no exclamation mark. Images need attribution. PDFs render inside the note page when a direct PDF link exists.

## Repo layout

- `app` holds home, topics, and `/learn/[slug]` routes
- `components` holds the Mermaid renderer and the PDF viewer
- `lib/library.ts` reads the file database and renders markdown
- `content/library.json` is the index for all notes
- `content/entries` holds one markdown file per note
- `public/images` holds attributed images by slug
- `scripts` holds validation and README generation

## PDF support

GitHub previews PDFs on its own. The site also embeds the source PDF with an `object` viewer on each note page when `pdf_url` is set. The full PDF text is not copied. Only a short summary is stored.

## Deployment

This app builds with `npm run build` and runs on Vercel or any Node host that supports Next.js 14.

Vercel settings:

- Framework preset: Next.js
- Build command: `npm run build`
- Output: default Next.js output
- Node: 22

## Roadmap

- Phase 1: file database in this repo, current phase
- Phase 2: keep file database until about 200 to 400 notes
- Phase 3: export `content/library.json` to Supabase on request, keep slugs and routes unchanged

## License

MIT. See `LICENSE`.

<!-- BEGIN AUTO -->

Total notes: 1

### Topics

| Topic | Notes | Link |
| --- | --- | --- |
| how to use | 1 | [Open notes](/?topic=how%20to%20use) |
| start here | 1 | [Open notes](/?topic=start%20here) |

### Recent notes

- 2026-09-18 [Welcome to AI Exploration](/learn/2026-09-18-welcome-to-ai-exploration) (AI Exploration)

### Site map

```mermaid
flowchart TD
  Home[AI Exploration home]
  T0["how to use"]
  T1["start here"]
  Home --> T0
  Home --> T1
```

<!-- END AUTO -->
