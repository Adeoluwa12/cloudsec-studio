# CloudSec.studio Client

Next.js 14 (App Router) + Tailwind + Framer Motion + xterm.js + next-pwa.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local`, point `NEXT_PUBLIC_API_URL` at your backend (port 4001 locally).
3. Add real PWA icons at `public/icons/icon-192.png` and `public/icons/icon-512.png`
   (placeholders aren't included — drop your own artwork in).
4. `npm run dev` (runs on port 3001 to avoid clashing with the portfolio app if
   you run both locally at once).

## Design system

Redesigned with a Fluent/Microsoft-Learn-inspired look — light by default
(toggle to dark via the nav bar), brand blue accent (`#0078D4`), soft
elevation shadows instead of heavy borders, pill buttons, rounded 2xl cards,
and a subtle gradient-mesh background on hero/auth sections. Fonts: Manrope
(headings) + Inter (body) + JetBrains Mono (code/terminal only) — colors and
spacing tokens live in `tailwind.config.js` and `app/globals.css` as CSS
variables, so the dark/light toggle is a class swap, not a duplicate theme.

## What's built

- Home (`/`) — terminal boot-sequence hero + latest published posts
- `/login` — Google/GitHub OAuth buttons (full redirect flow, see backend README)
- `/auth/callback` — grabs the JWT from the OAuth redirect and stores it
- `/blog/[slug]` — full post with markdown render, links to quiz + lab
- `/quiz/[postId]` — instant-graded quiz, saves score if signed in
- `/labs/[postId]` — xterm.js terminal sandbox wired to the backend's mock
  command validation; passing the lab's `validatesTask` command awards a badge
- `/interview-prep` — written/video toggle per question
- `/dashboard` — signed-in user's badges + per-module progress

## PWA

`next-pwa` is wired in `next.config.js` (disabled in dev, active in production
builds). `manifest.json` is in `public/`. Once icons are added and it's deployed
over HTTPS, it'll be installable.

- `/admin/login` → `/admin/dashboard` — CMS for posts, quizzes, labs, and
  interview questions (create/edit/delete), plus an analytics tab. Gated by
  checking `role` from `/api/auth/me` after OAuth login — non-admins are
  bounced to the student dashboard. Quiz questions and lab commands are edited
  as raw JSON in a textarea (nested array fields) rather than dedicated
  sub-forms — fine for now, worth revisiting if that gets tedious.

## Still to build

- Blog listing/filter page beyond the homepage feed
- Dedicated sub-forms for quiz questions / lab commands instead of raw JSON
