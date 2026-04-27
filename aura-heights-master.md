# Aura Heights — Master Agent Briefing
> Built by Luxie Sites (luxiesites.com) · Developer: Madhav · Last updated: April 2026

vimeo video embed: "<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1180208048?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="fulledited"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>"
---

## 1. Project Overview

| Field | Detail |
|---|---|
| Client | Aura Heights |
| Type | Luxury residential apartment — brochure + contact site |
| Location | Dehradun, Uttarakhand, India |
| Studio | Luxie Sites |
| Developer | Madhav (Founder) |
| Status | In progress |

**Goal:** A premium digital showroom. Not an e-commerce platform. Not a listing site. Every section should feel like it belongs in an architectural magazine. The three primary visitor actions are: understand the project, watch the render video, and request a site visit.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Animations | GSAP + Framer Motion |
| Smooth scroll | Lenis (disable on mobile if hijacking occurs) |
| Hosting | Vercel |
| Forms | Formspree |
| Video hosting | Vimeo |
| Icons | Custom SVG (generated via ckm:design icon skill) |
| Scroll animations | 21st.dev component library |

---

## 3. Design System

### 3.1 Color Palette

**The Aura Heights logo uses a bronze/champagne metallic gradient — not a flat gold.** All accent colors across the site must harmonise with this tone. The primary accent is `#B8892A`.

#### Light Mode (Default — ships first)

| CSS Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FAF7F2` | Page background — warm ivory, never pure white |
| `--bg-secondary` | `#F0EBE3` | Alternate section backgrounds |
| `--marble` | `#E8E0D5` | Cards, dividers, marble-texture areas |
| `--text-primary` | `#1C1C1C` | All headings and body text |
| `--text-muted` | `#7A7268` | Captions, labels, subtext |
| `--bronze` | `#B8892A` | Primary accent — matched to logo. Dividers, labels, CTA borders, hover states |
| `--bronze-light` | `#C9A04A` | Lighter bronze for hover states |
| `--sage` | `#7A9E7E` | Secondary accent — nature/mountain reference |
| `--vision-bg` | `#2A2420` | Used only in Section 6 (Vision) for contrast |

> **Rule (light mode):** No dark backgrounds except the Vision section. Everything is light, warm, airy.

#### Dark Mode

> **⚠️ IMPORTANT — Read before implementing:**
> Dark mode is defined here for future implementation. **The site ships in light mode by default.** Do not build dark mode UI until Madhav confirms.
>
> **The day/night photography plan:** When the physical Aura Heights project is complete, real daytime and nighttime photographs will be taken. Light mode uses daytime photos. Dark mode uses nighttime photos. The hero, intro, and gallery sections will swap images based on the active colour mode. This is a **future feature** — use the same render stills as placeholders in both modes for now.

| CSS Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0F0D0B` | Deep warm near-black — not pure black |
| `--bg-secondary` | `#1A1714` | Slightly lighter warm dark for alternating sections |
| `--marble` | `#252018` | Cards, dividers |
| `--text-primary` | `#F5F0E8` | Warm off-white — not pure white |
| `--text-muted` | `#8A8078` | Captions, subtext |
| `--bronze` | `#C9A04A` | Slightly brighter in dark mode so it reads on dark bg |
| `--bronze-light` | `#DDB862` | Hover states in dark mode |
| `--sage` | `#5A7A5C` | Muted in dark mode |
| `--vision-bg` | `#080604` | Deepest dark — Vision section in dark mode |

**CSS implementation:**
```css
/* globals.css */
:root {
  --bg: #FAF7F2;
  --bg-secondary: #F0EBE3;
  --marble: #E8E0D5;
  --text-primary: #1C1C1C;
  --text-muted: #7A7268;
  --bronze: #B8892A;
  --bronze-light: #C9A04A;
  --sage: #7A9E7E;
  --vision-bg: #2A2420;
}

.dark {
  --bg: #0F0D0B;
  --bg-secondary: #1A1714;
  --marble: #252018;
  --text-primary: #F5F0E8;
  --text-muted: #8A8078;
  --bronze: #C9A04A;
  --bronze-light: #DDB862;
  --sage: #5A7A5C;
  --vision-bg: #080604;
}
```

**Dark mode toggle:**
- Sun/moon icon in navbar (right side, before CTA button)
- Use `next-themes` for implementation
- Apply `.dark` class to `<html>` element
- Save preference to `localStorage`
- Default: always `light` — never auto-detect system preference

**Image swapping (future — placeholder for now):**
```jsx
// When real day/night photos are available:
const { theme } = useTheme()
const heroImage = theme === 'dark' ? '/images/hero-night.webp' : '/images/hero-day.webp'
// Apply same logic to: intro section image, gallery images
// For now: use same render still for both modes
```

---

### 3.2 Typography

| Role | Font | Implementation |
|---|---|---|
| Display / Hero headings | `Cormorant Garant` | Large, generous letter-spacing, high contrast |
| Subheadings | `Cormorant Garant` Italic | Softer, editorial feel |
| Body / UI | `Tenor Sans` | Architectural, refined, legible |
| Section labels | `Josefin Sans` | Uppercase, `text-xs tracking-[0.25em]`, geometric |

All four fonts are on Google Fonts — free, no licensing needed.

**Typography rules:**
- Section labels: `Josefin Sans`, uppercase, `text-xs tracking-[0.25em]`, `var(--bronze)` color
- Hero heading: `Cormorant Garant`, minimum `text-7xl`, `font-light`
- Body copy: `Tenor Sans`, max line length `~65ch`, `leading-relaxed`
- Never crowd text — whitespace is the design
- Thin bronze horizontal rule (`1px`, `var(--bronze)`) above every section label

### 3.3 Motion Principles

- **Entrance animations:** Framer Motion `whileInView` with `viewport={{ once: true }}`
- **Scroll animations:** 21st.dev components — text reveals, clip-path wipes, stagger grids
- **Hero parallax:** Background moves at `0.4x` scroll speed via Lenis scroll position
- **Hover states:** Bronze underline slides in on nav links, subtle `scale(1.02)` on cards
- **No aggressive animations** — everything breathes, nothing bounces or spins
- **GSAP:** Used for preloader timeline only
- **Framer Motion:** Used for all scroll-triggered section entrances

---

## 4. Asset Pipeline

### 4.1 Video — Trimming Guide

You have one source video (2 min+) with a cinematic intro. Export THREE separate clips:

**Export 1 — Preloader Clip**
- Content: Cinematic logo/title reveal at the very start only
- Duration: 5–8 seconds max
- Export: `.mp4` + `.webm`, under 8MB, HandBrake H.264
- Used in: Loading screen

**Export 2 — Hero Loop**
- Content: Best clean exterior shot — no text overlays, no logo
- Duration: 8–12 seconds, loops seamlessly
- Export: `.mp4` + `.webm`, under 5MB, muted
- Mobile: Replace with a still frame — no autoplay on mobile

**Export 3 — Vision Section Embed**
- Content: Best 60–90 sec of the walkthrough
- Sequence: Exterior → lobby → living room → bedroom → bathroom → balcony view
- Emotional arc: "arrival → home → private → the view"
- Upload directly to Vimeo (unlisted) — Vimeo handles compression

**Still Frames to Extract** (export as `.webp`, quality 80–85% via Squoosh):

| Frame | Used In |
|---|---|
| Exterior / building facade | Hero fallback (mobile), intro split |
| Living room | Residences tab |
| Bedroom | Residences tab |
| Kitchen | Residences tab |
| Bathroom | Residences tab |
| Balcony / view | Gallery, intro section |
| Wide interior shot | Gallery |

These are also placeholders for dark mode until real night photography is delivered.

### 4.2 Icons (Amenities Section)

```bash
# ckm:design icon skill — outlined style, bronze matched to logo
python3 ~/.claude/skills/design/scripts/icon/generate.py --prompt "rooftop terrace" --style outlined --color "#B8892A"
python3 ~/.claude/skills/design/scripts/icon/generate.py --prompt "concierge bell service" --style outlined --color "#B8892A"
python3 ~/.claude/skills/design/scripts/icon/generate.py --prompt "covered parking garage" --style outlined --color "#B8892A"
python3 ~/.claude/skills/design/scripts/icon/generate.py --prompt "landscaped garden" --style outlined --color "#B8892A"
python3 ~/.claude/skills/design/scripts/icon/generate.py --prompt "elevator lift building" --style outlined --color "#B8892A"
python3 ~/.claude/skills/design/scripts/icon/generate.py --prompt "security shield 24 hours" --style outlined --color "#B8892A"
```

Export sizes: `24,48` — use 48px in the grid.
Dark mode variant: re-export with `--color "#C9A04A"` or handle via CSS `filter`.

### 4.3 Social / Marketing Assets (Optional)

Use `ckm:design` Social Photos workflow if launch assets are needed:
- Platform: Instagram (`1080×1080` post, `1080×1920` story)
- Style: Photo-Based — render still as base, logo + tagline overlay
- Fonts: Cormorant Garant (headline) + Josefin Sans (label)
- Palette: `#FAF7F2` ivory + `#B8892A` bronze

---

## 5. Site Structure — Section by Section

### Section 0: Preloader (Curtain Reveal)

**Concept:** Two vertical panels part like theatre curtains. Aura Heights logo fades in centred, then flies to navbar position as curtains open.

**GSAP Timeline:**
```
Phase 1 (0–800ms)     → Logo fades in at centre, scale 1.2 → 1.0
Phase 2 (800–1500ms)  → Logo holds. Curtains begin parting (scaleX: 1 → 0)
Phase 3 (1500–2200ms) → Logo translates centre → top-left, scales to navbar size
                         Curtains finish opening
Phase 4 (2200ms)      → Preloader unmounts. Hero entrance begins.
```

**Notes:**
- Curtain colour: `var(--bg)` — matches active mode automatically
- Panels: `position: fixed`, `transformOrigin: 'left'` / `'right'`
- Logo: `position: fixed`, GSAP animates to exact final navbar position
- Tied to `window.onload` — not a fake timer
- Mobile: Single panel slides up. Logo still flies to top-left.

---

### Section 1: Navbar

- `position: sticky`, `top: 0`, `z-50`
- Light: transparent → `rgba(250,247,242,0.85)` + `backdrop-blur-md` on scroll
- Dark: transparent → `rgba(15,13,11,0.85)` + `backdrop-blur-md` on scroll
- Left: Aura Heights logo (SVG)
- Centre: `Residences · Amenities · Gallery · Location · Contact` — Josefin Sans, uppercase, `text-xs tracking-[0.2em]`
- Right: sun/moon toggle + `Book a Viewing` bronze border button
- Active section highlighted via Intersection Observer
- Mobile: hamburger → full-screen overlay, links stagger in (80ms delay each)

---

### Section 2: Hero

Full viewport height. Background: exterior render still / looping video clip.

```
[label]    DEHRADUN · UTTARAKHAND     ← Josefin Sans, var(--bronze), tracked
[heading]  Where Elevation            ← Cormorant Garant, text-7xl, font-light
           Meets Elegance
[sub]      Residences designed for    ← Tenor Sans, var(--text-muted)
           those who expect the
           extraordinary.
[cta]      Explore Residences →       ← Ghost button, var(--bronze) border
```

- Animation: 21st.dev split-text word stagger (~1.2s after preloader)
- Parallax: bg at 0.4x scroll speed via Lenis
- Dark mode: same render still for now — swap to nighttime photo when available

---

### Section 3: Introduction / Overview

- Split: editorial copy left (40%), tall portrait image right (60%)
- Bronze `1px` rule + `ABOUT THE PROJECT` label above copy
- Copy: lean into Dehradun elevation, greenery, mountain air
- Animation: copy slides from left, image clip-path wipes from right (21st.dev)
- Dark mode: `--bg-secondary` dark bg, same image placeholder

---

### Section 4: The Residences

- Tab switcher: `2BHK` / `3BHK` — minimal bronze pill tabs
- Each tab: unit name, sq ft, 3–4 features, render still, floor plan (placeholder)
- CTA: `Enquire About This Unit →` → scrolls to contact
- Tab switch: cross-fade 300ms
- Image entrance: scale 1.05 → 1.0 zoom-out + 21st.dev clip-path wipe

---

### Section 5: The Vision (Render Video)

**Always dark in both light and dark mode.** Uses `var(--vision-bg)`.

```
[label]    THE VISION                 ← Josefin Sans, var(--bronze)
[heading]  Every Detail.             ← Cormorant Garant, white/warm-white
           Before the First Stone.
[embed]    Vimeo — 60–90 sec cut     ← Custom bronze play button
```

- GSAP ScrollTrigger: bg transitions from `--bg` → `--vision-bg` as section enters
- Vimeo: unlisted, `background=1&autopause=0`, custom play button overlay

---

### Section 6: Amenities

- 3-col grid desktop → 2-col tablet → 1-col mobile
- Each card: 48px outlined SVG icon (bronze) + heading + one sentence
- Placeholder list: Rooftop Terrace · Concierge · Parking · Gardens · Elevators · Security
- Animation: 21st.dev stagger grid, 80ms delay per card
- Dark mode: `--marble` dark card bg, `--bronze` dark icon colour

---

### Section 7: Gallery

- Horizontal scroll — GSAP ScrollTrigger pin + horizontal movement
- 6–8 tall portrait render stills
- Lightbox on click (prev/next)
- Mobile: single column scroll, no pin
- Dark mode: same render stills, swaps to night photos when available

---

### Section 8: Location & Neighbourhood

- Two-column: Google Maps iframe (left) + curated highlights (right)
- Map filter: `grayscale(30%)` light / `grayscale(60%) brightness(0.7)` dark
- Highlights: school, hospital, mall, nature spots with distances
- Animation: map fades in, items stagger right (21st.dev, 60ms delay)

---

### Section 9: Contact — Request a Private Viewing

Three columns: Form | Phone | WhatsApp

- Form: Name · Phone · Unit Interest · Message — Formspree endpoint
- `_gotcha` honeypot, inline success state, no redirect
- Forward to: `hello@luxiesites.com` (or client email — confirm)
- Dark mode: inputs use `--marble` dark, submit uses `--bronze` dark

---

### Section 10: Footer

```
[Aura Heights logo]   [tagline]
Residences · Amenities · Gallery · Location · Contact
Designed & developed by Luxie Sites (luxiesites.com)
© 2026 Aura Heights. All rights reserved.
```

---

## 6. Animation Master Reference

| Section | Library | Animation |
|---|---|---|
| Preloader | GSAP | Curtain scaleX + logo translate/scale timeline |
| Navbar | GSAP | Link stagger on mobile open |
| Hero | 21st.dev | Split-text word stagger |
| Hero bg | Lenis | Parallax 0.4x |
| Intro | 21st.dev | Left/right slide-in + clip-path wipe |
| Residences | Framer Motion | Cross-fade tabs + zoom-out image |
| Vision | GSAP ScrollTrigger | bg colour transition + heading stagger |
| Amenities | 21st.dev | Stagger grid (80ms) |
| Gallery | GSAP ScrollTrigger | Horizontal pin + image scale |
| Location | 21st.dev | List stagger right (60ms) |
| Contact | 21st.dev | Floating label on focus |

---

## 7. Dark Mode — Implementation Summary

| Item | Detail |
|---|---|
| Default | Light mode |
| Toggle | Sun/moon icon in navbar |
| Library | `next-themes` |
| CSS approach | `.dark` class on `<html>`, CSS custom properties |
| localStorage | Save preference |
| Hero image | Placeholder (render still) — swap to night photo post-construction |
| Intro image | Placeholder — same |
| Gallery | Placeholder — same |
| Vision section | Always dark in both modes |
| Icons | Re-export at `#C9A04A` for dark, or CSS filter |
| **Status** | **Define tokens only. Do not build UI until Madhav confirms.** |

---

## 8. Mobile Considerations

- Hero: still frame, no autoplay video
- Preloader: single panel slides up
- Amenities: 2 columns
- Residences: vertical tab stack
- Gallery: single column scroll
- Contact: columns stack vertically
- Lenis: disable if hijacking occurs on mobile

---

## 9. Performance Rules

- Images: `.webp`, Squoosh quality 80–85%, `next/image` lazy load
- Preloader video: under 8MB, H.264, `.mp4` + `.webm`
- Full walkthrough: Vimeo only — never self-host
- Hero loop: under 5MB or use still frame
- No Three.js, no particle systems
- GSAP: import only `gsap` + `ScrollTrigger`
- Target: Lighthouse 85+ on mobile

---

## 10. Pending Items

| Item | Status |
|---|---|
| Client logo SVG (flat version) | Pending |
| Unit sq ft details | Pending |
| Confirmed amenities list | Pending |
| Floor plan images | Pending |
| Client WhatsApp number | Pending |
| Client phone number | Pending |
| Night-time photography | Future — post-construction |

Mark all placeholders with `{PLACEHOLDER}` comments in code.

---

## 11. Handoff Checklist

- [ ] Client logo received in SVG
- [ ] Bronze `#B8892A` verified against actual logo colour
- [ ] Preloader clip: 5–8 sec, under 8MB, `.mp4` + `.webm`
- [ ] Hero loop: 8–12 sec, under 5MB, `.mp4` + `.webm`
- [ ] Vision clip uploaded to Vimeo, embed link ready
- [ ] Still frames extracted as `.webp`
- [ ] Amenity icons generated (outlined, `#B8892A`)
- [ ] CSS tokens defined for light + dark
- [ ] Dark mode toggle working, localStorage saving
- [ ] Formspree live and tested
- [ ] Phone + WhatsApp confirmed with client
- [ ] Unit details confirmed
- [ ] Floor plans received or placeholder confirmed
- [ ] Amenities list confirmed
- [ ] Lenis mobile tested
- [ ] Navbar scroll transition tested (both modes)
- [ ] Hamburger menu mobile tested
- [ ] All sections checked in dark mode for contrast
- [ ] Lighthouse 85+ on mobile
- [ ] Luxie Sites footer credit at luxiesites.com
