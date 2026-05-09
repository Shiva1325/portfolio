# Design System — Shiva Patibandla Portfolio

## Product Context
- **What this is:** Personal portfolio for a software engineer at Goldman Sachs
- **Who it's for:** Recruiters, hiring managers, and engineering peers evaluating technical credibility
- **Space/industry:** Software engineering — financial systems, distributed systems, full-stack
- **Project type:** Marketing/landing page (portfolio, conversion = resume download + contact)
- **Memorable thing:** Serious craft, at scale, that looks nothing like anyone else's portfolio

## Aesthetic Direction
- **Direction:** Premium Dark Precision — retro-futuristic soul, executed with precision. Goldman credibility + visual distinctiveness + proof of craft.
- **Decoration level:** Intentional — the 3D sphere and particle field are kept (genuinely good). Everything else is quieter.
- **Mood:** The site should feel like a Goldman quant built a personal site. Technically confident, visually deliberate, not trying to be everything at once.

## Typography

- **Display/Hero:** Syne — geometric, futuristic, strong personality. Distinctive without being flashy. Used for h1-h3 headings, section titles, hero text, button labels. The `font-display` Tailwind class maps here.
- **Body:** DM Sans — warm, screen-optimized, precise. Pairs cleanly with Syne without competing. The default `font-sans` maps here.
- **Code/Labels:** JetBrains Mono — domain-appropriate, excellent readability. The `font-mono` Tailwind class maps here.

**Google Fonts:** `https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=JetBrains+Mono:wght@300;400;500;700&display=swap`

**Blacklisted for this project:** Space Grotesk, Inter, Roboto, Poppins (all overused in dev portfolios).

## Color

- **Approach:** Restrained — one primary accent. Orange is the brand.
- **Background:** `#050A0E` (near-black with deep navy undertone)
- **Primary accent:** `#F97316` (orange) — the ONLY brand accent. Used for CTAs, active states, labels, highlights, all section markers.
- **Secondary accent:** `#22D3EE` (cyan) — rare contrast signal only. Status dots, progress indicators, the skill sphere filter. Never used as a section label color.
- **Success/available:** `#00FF88` (green) — reserved exclusively for "available" status dot and success states.
- **Achievements only:** `#FFD700` (gold) — used in the Achievements gamification section only. Not part of the main brand palette.
- **Text:** `#E8F4FD` (off-white primary), `rgba(255,255,255,0.6)` (body), `rgba(255,255,255,0.4)` (muted), `rgba(255,255,255,0.2)` (very subtle)
- **Glass surfaces:** `rgba(255,255,255,0.03)` background, `rgba(255,255,255,0.06)` border

**Dark mode:** This is a dark-only site. Do not add light mode.

**Section labels rule:** All section labels (the small ALL-CAPS line above h2s) must use orange `#F97316`/`#F9731688`. Never per-section different colors — that fragments the brand. The only exception is Achievements (gold is thematically intentional).

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable
- **Section padding:** 6rem (mobile) → 8rem (tablet) → 10rem (desktop), via `.section-pad`
- **Max content width:** `max-w-4xl` for text sections, `max-w-6xl` for grid sections

## Layout
- **Approach:** Grid-disciplined with intentional vertical scroll
- **Grid:** Single column on mobile, 2-column on md+, 3-column on lg+ for projects
- **Border radius:** `rounded-xl` (cards, inputs), `rounded-2xl` (larger cards), `rounded-full` (pills, buttons, tags)
- **Glass cards:** `.glass` class — backdrop-blur-12, 3% white background, 6% white border

## Motion
- **Approach:** Expressive — the animations are the differentiator, but only one section animates prominently at a time
- **Library:** GSAP (scroll-triggered reveals, text animations) + Framer Motion (enter/exit transitions)
- **Easing:** `power2.out` for entrances, `power2.inOut` for continuous, `back.out(2)` for springy reveals
- **Key animations:** Hero particle field (Three.js), skill sphere (custom 3D), GSAP scroll timeline
- **Accessibility:** `prefers-reduced-motion` media query in globals.css kills all animation for affected users

## Texture
- **Grain:** CSS SVG feTurbulence noise overlay on body (`body::before`), opacity 0.055 — gives surfaces a handcrafted feel, distinguishes from AI-generated template look.

## Anti-patterns (never do these)
- Purple/violet/indigo gradients as any background or hero accent
- 3-column SaaS icon grid (icon-in-circle + title + description)
- Centered everything with uniform spacing
- Uniform bubbly border-radius on every element
- Space Grotesk, Inter, Roboto, or Poppins as display/body fonts
- Per-section different accent colors (the rainbow trap)
- `transition: all` — always use specific properties

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-09 | Replaced Space Grotesk with Syne (display) + DM Sans (body) | Space Grotesk appears in 80% of AI-generated dev portfolios. Syne + DM Sans creates a more distinctive combination while remaining professional. |
| 2026-05-09 | Unified all section labels to orange `#F97316` | Per-section rainbow labels (cyan/green/gold/red) fragmented the brand. Single-accent discipline makes orange feel like a deliberate identity, not a default. |
| 2026-05-09 | Added CSS grain texture to body | SVG feTurbulence overlay at 5.5% opacity gives the dark surface a handcrafted quality that distinguishes from clean AI-template look. |
| 2026-05-09 | Added prefers-reduced-motion CSS | Accessibility fix — site had 8+ concurrent animations with no reduced-motion support. |
| 2026-05-09 | Added focus-visible keyboard styles | Accessibility fix — keyboard navigation had no visible focus ring. |
