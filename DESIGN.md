# Design System — Shiva Patibandla Portfolio

## North Star

**"Serious engineer, real human."**

Every design decision serves this. The dark aesthetic and technical animations signal
seriousness. The personal copy (origin story, hiking, snooker, Olympic National Park)
signals humanity. The animated details — particle field, 3D skill sphere, GSAP name
reveal — signal a craftsman who cares about the work. Nothing should compete with those
three signals.

**The memorable detail:** The Three.js particle field and draggable 3D skill sphere.
Every other visual element should support these, not rival them for attention.

---

## Product Context

- **What this is:** Personal portfolio for Shiva Patibandla, Software Engineer at Goldman Sachs
- **Who it's for:** Recruiters, engineering managers, potential collaborators in the distributed systems / backend infrastructure space
- **Industry:** Financial tech / distributed systems engineering
- **Project type:** Personal portfolio / interactive showcase
- **Tech stack:** React 18 + Vite, Three.js + @react-three/fiber, GSAP + ScrollTrigger, Framer Motion, Tailwind CSS, EmailJS, GitHub Pages

---

## Aesthetic Direction

- **Direction:** Retro-Futuristic / Dark Tech
- **Decoration level:** Intentional — CRT scanlines, dot-grid, glassmorphism, particle field. Each element earns its place.
- **Mood:** The inside of a high-stakes trading system interface — precise, alive, slightly dangerous. Not a game, not a toy. A working machine that someone cares about.
- **What to avoid:** Adding more neon colors, more gradients, more animations. The system is already expressive. New additions must justify their presence.

---

## Color

### Approach
Four-color accent system with a strict hierarchy. Orange is the brand color. Cyan is the technical/data accent. Green is the career accent. Gold is the academic accent. This mapping is intentional — follow it.

### Palette

| Role | Hex | Name | Where used |
|------|-----|------|-----------|
| Background | `#050A0E` | Near-black navy | Body, all section backgrounds |
| Text primary | `#E8F4FD` | Off-white | All body and heading text |
| Text muted | `rgba(255,255,255,0.50)` | White/50 | Body copy, descriptions |
| Text subtle | `rgba(255,255,255,0.40)` | White/40 | Secondary labels |
| Text ghost | `rgba(255,255,255,0.30)` | White/30 | Placeholders, hints |
| Text whisper | `rgba(255,255,255,0.20)` | White/20 | Decorative labels, timestamps |
| **Brand — Orange** | `#F97316` | Neon orange | Hero, About, Achievements, Contact section labels; CTAs; selection; scrollbar; neon-text; gradient-text start; dot-grid dots |
| **Technical — Cyan** | `#22D3EE` | Electric cyan | Skills, Projects section labels; active skill filter; progress indicator; gradient-text end; neon-text-purple class |
| **Career — Green** | `#00FF88` | Phosphor green | Experience section label; status dots (pulsing "online"); success states |
| **Academic — Gold** | `#FFB800` | Amber gold | Education section label; course chips; academic tags |

### Section Label Color Map

Every section has exactly one accent color. Do not mix:

```
Hero         → #F97316  (orange)
About        → #F97316  (orange)
Skills       → #22D3EE  (cyan)
Experience   → #00FF88  (green)
Education    → #FFB800  (gold)
Projects     → #22D3EE  (cyan)
Achievements → #F97316  (orange)
Contact      → #F97316  (orange)
```

### Opacity Conventions

Inline color opacity follows this pattern (using orange as example):
```
#F97316     — full, solid: CTAs, active states, on-hover glows
#F97316CC   — 80%: badges, important indicators
#F97316AA   — 67%: section labels (subtle label text)
#F97316 / white/50%: body text
#F9731688   — 53%: section label text (dim)
#F9731644   — 27%: border glows, timeline line
#F9731633   — 20%: card borders at rest
#F9731614   — 8%: card/chip backgrounds
#F9731608   — 3%: neon border box-shadow inset
#F9731606   — 4%: neon-border shadow outer
```

### Gradient Text

Used for section sub-headings (e.g., "the _code_", "_Connect_", "My _Arsenal_"):

```css
background: linear-gradient(135deg, #F97316 0%, #22D3EE 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Glass Surface

All cards, inputs, and floating surfaces use the glass system:

```css
background: rgba(255,255,255,0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.06);
```

Hover/focus elevates the border to `rgba(255,255,255,0.12)`. On card hover,
add a colored glow matching the section accent at 8% opacity.

### Dot Grid Background

Applied to sections via `.dot-grid` class (About, Contact, Achievements):

```css
background-image: radial-gradient(circle, rgba(249,115,22,0.07) 1px, transparent 1px);
background-size: 32px 32px;
```

### Known Tailwind Config Naming Error

`tailwind.config.js` has inverted names — do NOT use these token names in reasoning:
- `neon-cyan` in config = `#F97316` (it's actually orange)
- `neon-purple` in config = `#22D3EE` (it's actually cyan)

Always reference colors by hex value in new code, not by these Tailwind tokens.

---

## Typography

### Fonts

| Role | Font | Weights | CDN |
|------|------|---------|-----|
| Display / UI | Space Grotesk | 300, 400, 500, 600, 700 | Google Fonts |
| Code / Labels / Mono | JetBrains Mono | 300, 400, 500, 700 | Google Fonts |

**Space Grotesk** (`font-display` in Tailwind) handles all headings, UI labels,
button text, nav items, and body copy.

**JetBrains Mono** (`font-mono` in Tailwind) handles: section labels (`text-xs font-mono tracking-widest uppercase`), terminal decorations, code snippets, typewriter animations, data values, skill tags.

Font loading:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
```

### Type Scale

| Level | Size | Font | Weight | Usage |
|-------|------|------|--------|-------|
| Hero name | `clamp(1.85rem, 9vw, 8rem)` | Space Grotesk | 700 | Hero section only |
| Section heading | `text-3xl` → `text-5xl` | Space Grotesk | 700 | `h2` in each section |
| Sub-heading | `text-xl` → `text-2xl` | Space Grotesk | 600 | Typewriter, card titles |
| Body large | `text-base` → `text-lg` | Space Grotesk | 400 | About bio, project descriptions |
| Body default | `text-sm` | Space Grotesk | 400 | Most UI text |
| Section label | `text-xs` + `tracking-widest` | JetBrains Mono | 400 | Top-of-section identifiers |
| Micro | `text-[10px]` / `text-[11px]` | JetBrains Mono | 400 | Terminal readout, timestamps, hints |

### Section Label Pattern

Every section opens with this component (accent color varies by section):

```jsx
<div className="flex items-center gap-3 mb-12">
  <div className="w-8 h-px bg-[SECTION_COLOR]" />
  <span className="text-xs font-mono tracking-widest text-[SECTION_COLOR_88] uppercase">
    Section Name
  </span>
</div>
```

---

## Spacing

- **Base unit:** 4px (Tailwind default)
- **Density:** Comfortable-to-spacious — sections breathe, cards have internal padding

### Section Padding (`.section-pad`)

```
Mobile:  6rem vertical / 1.5rem horizontal
md:      8rem vertical / 3rem horizontal
xl+:     10rem vertical / 6rem horizontal
```

### Content Max Widths

| Context | Max Width | Rem |
|---------|-----------|-----|
| Text-heavy sections (Contact, hero copy) | `max-w-4xl` | 56rem / 896px |
| Grid sections (About, Skills, Projects, Experience) | `max-w-6xl` | 72rem / 1152px |
| Hero inner | `max-w-4xl` | 56rem / 896px |

### Border Radius

| Context | Class | px |
|---------|-------|-----|
| Pill buttons, badges, nav pills | `rounded-full` | 9999px |
| Project cards, stat cards, glass panels | `rounded-2xl` | 16px |
| Inputs, form fields, skill sphere container | `rounded-xl` | 12px |
| Large container (skill sphere outer) | `rounded-3xl` | 24px |
| Small elements, dropdowns | `rounded-lg` | 8px |

---

## Layout

- **Approach:** Grid-disciplined with creative hero
- **Grid:** 1 col (mobile) → 2 col (md) → 3 col (lg) for projects grid
- **Skills grid:** 2 × 2 stat cards (About), free-floating 3D sphere (Skills)
- **Timeline:** Single vertical line, alternating left/right cards (Experience)

### Grid Patterns

```
Projects grid (md+): md:grid-cols-2 lg:grid-cols-3
  — featured card: col-span-2 (only ONE card should be featured at a time)
  — regular cards: col-span-1

About section: md:grid-cols-2
  — Left: photo + 2×2 stat grid
  — Right: bio + code block

Skills: full-width sphere container (height: 520px)

Contact: md:grid-cols-2
  — Left: copy + social links
  — Right: form
```

---

## Motion

- **Approach:** Intentional — every animation communicates something
- **Principle:** The Three.js particles and 3D sphere ARE the animation showpiece. Everything else is support.

### Easing

| Context | Easing |
|---------|--------|
| Enter (Framer Motion) | `ease-out` (default) |
| Name reveal (GSAP) | `back.out(2)` |
| Count-up numbers (GSAP) | `power2.out` |
| Stat card count-up | 1.8s duration |
| Glitch skew (GSAP) | `0.05s yoyo repeat 3`, every 5s |

### Duration Guidelines

| Type | Duration |
|------|----------|
| Micro interactions (hover, click) | 100–200ms |
| UI transitions (filter change, state) | 200–300ms |
| Section enters (Framer Motion) | 500–700ms |
| Name reveal (GSAP stagger) | 0.7s per char, 0.05s stagger |
| Nebula drift (CSS) | 15–22s cycles |
| Three.js particle rotation | `0.04 rad/s` Y-axis, mouse-reactive |

### Stagger Pattern

Section elements enter with `initial={{ opacity: 0, y: 30 }}`, staggered by 0.15s:
```jsx
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ delay: index * 0.15, duration: 0.6 }}
```

### CRT Overlay

Hero section has `.crt` class — CSS scanline overlay:
```css
repeating-linear-gradient(0deg, transparent, transparent 3px,
  rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)
```
Do not add this to other sections. It's the hero's signature.

### Reduced Motion

All animations are disabled when `prefers-reduced-motion: reduce` is set.
This is enforced in globals.css — do not override it.

---

## Gamification System

The portfolio has an achievement unlock system. Sections trigger unlocks when scrolled into view:

| Section | Achievement | Color accent used |
|---------|-------------|-----------------|
| Hero | First Contact | orange |
| Skills | Tech Enthusiast | cyan |
| Experience | Career Stalker | green |
| Projects | Project Connoisseur | orange |
| Contact | Full Explorer | orange |

Achievement badge colors follow the section accent color of the unlocking section.
Toast notifications appear top-right.

Hidden: Konami code (↑↑↓↓←→←→BA) triggers a special badge.

---

## Component Patterns

### Neon Border (orange-only)

`.neon-border` class is hardcoded orange. Only use on orange-accent sections:
```css
border: 1px solid rgba(249,115,22,0.3);
box-shadow: 0 0 20px rgba(249,115,22,0.1), inset 0 0 20px rgba(249,115,22,0.03);
```

For non-orange sections, use inline style with the section color instead of this class.

### Social Link Buttons

```jsx
className="w-11 h-11 glass rounded-xl flex items-center justify-center
  text-white/40 hover:text-[#F97316] hover:border-[#F9731644]
  transition-[color,border-color,transform] duration-200 hover:scale-110 neon-border"
```

### Filter Buttons (Skills / Projects)

Active state: solid background in section accent color, text `#050A0E` (near-black), font-bold  
Rest state: `rgba(255,255,255,0.04)` bg, `text-white/45`, `border: 1px solid rgba(255,255,255,0.08)`  
Size: `min-h-[44px]` (touch target compliance), `px-4 py-2`, `rounded-full`, `text-xs font-mono`

### Primary CTA Button (Hero)

```jsx
className="px-7 py-3 rounded-full bg-[#F97316] text-[#050A0E]
  font-display font-bold text-sm tracking-wide
  hover:shadow-neon-cyan hover:scale-105 active:scale-95 transition-all duration-200"
```

### Secondary CTA Button (Hero — Download Resume)

```jsx
className="px-7 py-3 rounded-full border border-[#F9731644] text-[#F97316]
  font-display font-semibold text-sm tracking-wide
  hover:bg-[#F973160A] hover:border-[#F9731688] transition-all duration-200"
```

---

## Custom Cursor

A custom cursor replaces the OS cursor everywhere (`cursor: none` on `*`).
The cursor system has:
- Default: small neon dot (4px) with spring easing
- Hover on interactive elements (`data-hover` attribute): 40px ring
- Click: brief particle burst

Every interactive element must have `data-hover` attribute to trigger the cursor expansion.

---

## Scrollbar

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #050A0E; }
::-webkit-scrollbar-thumb { background: #F9731644; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #F9731688; }
```

---

## Accessibility Baselines

- `prefers-reduced-motion` is respected — all animations disabled
- Focus ring: `outline: 2px solid #F97316; outline-offset: 2px; border-radius: 4px`
- Interactive elements minimum touch target: `min-h-[44px]` (WCAG 2.5.5)
- Color contrast: text `#E8F4FD` on `#050A0E` passes WCAG AA
- System cursor fallback via `@supports not (cursor: none)`

---

## What NOT to Add

Based on the research into 2025 engineering portfolio patterns:

- **No more accent colors.** Four is the maximum. Adding a fifth breaks the semantic hierarchy.
- **No purple/violet gradients.** Common AI design slop.
- **No 3-column feature grids with icon circles.** Generic.
- **No centered-everything layouts.** Left-aligned text sections are intentional.
- **No stock photo hero backgrounds.** The particle field IS the hero.
- **No decorative gradient blobs.** The nebula effect in Skills already handles atmospheric depth.
- **No Inter or Roboto.** The current typography stack is distinctive — don't downgrade.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-09 | Initial DESIGN.md created | Formalized existing system via /design-consultation |
| 2026-05-09 | Four-color accent system established | Orange=brand, Cyan=technical, Green=career, Gold=academic — semantic hierarchy |
| 2026-05-09 | Space Grotesk + JetBrains Mono kept | User confirmed; system is coherent as-is |
| 2026-05-09 | Section color map locked | Prevents future color drift across sections |
| 2026-05-09 | Tailwind config naming error documented | neon-cyan=orange, neon-purple=cyan — known legacy issue |
| 2026-05-09 | neon-border class documented as orange-only | Prevents misuse on non-orange sections |
| 2026-05-09 | Touch target minimum set at 44px | WCAG 2.5.5 compliance for filter buttons |
