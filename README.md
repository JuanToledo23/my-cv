# juantoledo.com.mx

Personal site of Juan Alberto Toledo Tello. One page per locale: `/` (English) and `/es` (Spanish).

**Stack:** Next.js 16 (App Router, Server Components), React 19, Tailwind CSS v4, TypeScript, Resend for the contact form, deployed on Vercel.

**Content:** all copy lives in `content/en.ts` and `content/es.ts`, typed by `content/types.ts`. Components receive content as props and contain no copy. To add a screenshot or repository link to a case, add `media` or `links` to it in both files.

**Design tokens:** `app/globals.css` (`@theme`), light by default, dark via `prefers-color-scheme`.

**Run locally** (Node 22, see `.nvmrc`):

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run lint
npm run a11y    # axe check on both routes (once: npx playwright install chromium)
```

The contact form needs `RESEND_API_KEY` in `.env` (and in the Vercel project settings). CV PDFs are served from `public/cv/`.
