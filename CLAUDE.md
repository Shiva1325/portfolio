# Claude Code Instructions — Shiva Patibandla Portfolio

## Design System

Always read `DESIGN.md` before making any visual or UI decisions.

All font choices, colors, spacing, motion rules, and aesthetic direction are defined there. Do not deviate without explicit user approval.

**Key rules enforced by DESIGN.md:**
- Section accent colors are fixed (orange/cyan/green/gold per section — see color map)
- `neon-border` class is orange-only — use inline styles for other accent colors
- Every new interactive element needs `data-hover` attribute for the custom cursor
- Touch targets must be `min-h-[44px]` (WCAG 2.5.5)
- Do not add a fifth accent color
- The Tailwind token `neon-cyan` = orange (#F97316), `neon-purple` = cyan (#22D3EE) — known legacy naming error, use hex values directly

In QA mode, flag any code that doesn't match DESIGN.md.

## Git

Active branch: `design/review-v2` — all changes go here until merged to `main` and deployed to GitHub Pages.

Deploy command: `npm run deploy` (runs `predeploy` build automatically).

## Project

- GitHub Pages base: `/portfolio/`
- Local dev: `npm run dev` → `http://localhost:5174/portfolio/`
- EmailJS credentials in `.env` (not committed)
- Resume PDF: `public/resume.pdf` — user updates this manually
- Avatar: `public/avatar.jpg`
- Resume sync metadata: `public/resume-meta.json`
