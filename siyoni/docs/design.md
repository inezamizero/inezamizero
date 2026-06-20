# Siyoni — Design Document

**Last updated:** 2026-06-20

## 1. Design Philosophy
Siyoni should feel like **coming home**.
- Familiar — patterns and colors Rwandans recognize
- Calm — not noisy, not trying to sell anything
- Intentional — every element has a purpose
- Reverent — this is a place for prayer, not entertainment

Reference: Hallow app (calm, focused). But Siyoni is distinctly African.

## 2. The Imigongo Motif
Traditional Rwandan geometric art from the Eastern Province.
Used as SVG borders, dividers, and subtle hero backgrounds.
Colors: warm (cream, ochre, brown) — not harsh black/white.
Rule: use sparingly. Never as a busy wallpaper.
Implementation: reusable SVG React components, never raster images.

## 3. Color System

### Base Palette (entire site)
| Name | Hex | Use |
|---|---|---|
| Cream | #F7F3EE | Page background |
| Warm White | #FDFAF6 | Card backgrounds |
| Dark Brown | #1C1008 | Primary text |
| Mid Brown | #5C3D1E | Secondary text, borders |
| Imigongo Ochre | #C4882A | Accents, icons, pattern |

### Liturgical Colors (Misa y'Umunsi page ONLY)
| Season | Period | Hex |
|---|---|---|
| Ordinary Time | Most of year | #2D6A4F (Forest Green) |
| Advent | 4 Sundays before Christmas | #4A235A (Deep Violet) |
| Christmas | Dec 25 – Baptism of the Lord | #C9A235 (Gold) |
| Lent | Ash Wednesday – Holy Thursday | #3B1F5E (Dark Purple) |
| Holy Week | Palm Sunday – Holy Saturday | #7A0C2E (Deep Crimson) |
| Easter | Easter – Pentecost eve | #D4A017 (Bright Gold) |
| Pentecost | Pentecost Sunday only | #B22222 (Flame Red) |

## 4. Typography
| Role | Font | Weight |
|---|---|---|
| Hero/Display headings | Cormorant Garamond | 700 |
| Section headings | Cormorant Garamond | 600 |
| Body/UI text | Inter | 400, 500 |
| Prayer text | Inter | 400, line-height 1.9 |

## 5. Layout
- Mobile-first, single column
- Tablet: 2-column card grids
- Desktop: max-width 1100px, centered
- Nav: sticky top bar (desktop), bottom tab bar (mobile)

### Cards
- Background: #FDFAF6
- Border: 1px solid #E8E0D5
- Border radius: 12px
- Shadow: 0 2px 8px rgba(28,16,8,0.06)
- Hover: translateY(-2px) — calm lift

## 6. Animations (Framer Motion)
- Hero text: fade in + slide up on load (0.3s)
- Section tiles: staggered fade-in on scroll
- Cards: slide in on scroll
- Nav: gains shadow after scrolling past hero
- Imigongo pattern: slow subtle parallax
- Rule: nothing longer than 0.4s, nothing that bounces

## 7. Navigation
### Desktop
- Left: Siyoni name/logo
- Center: Isengesho · Rozari · Novena · Misa y'Umunsi · Indirimbo
- Right: language toggle (future)

### Mobile (bottom tab bar)
- Gusenga (Home) · Isengesho · Rozari · Novena · Misa · Indirimbo

## 8. Imagery
- No AI images with people — uncanny, wrong
- Yes: AI abstract patterns, landscapes, textures (no faces)
- Yes: real Imigongo photography (with attribution)
- Yes: candles, rosary beads, Rwandan landscapes (no faces)
- Fallback: SVG geometric patterns — always safe

## 9. Tone of Voice
- Warm, not formal
- Kinyarwanda for content, English for navigation
- Empty states: "Nta sengesho ribonetse. Gerageza izina ryindi."
- Loading: one calm line, no spinners

## 10. Confirmed Decisions
- [x] Tagline: "Kuko Kiliziya ikuri mu mutima, aho uri hose"
- [x] Ko-fi: ko-fi.com/siyoni
- [x] Liturgical colors: Misa y'Umunsi page only
- [x] Imigongo: warm colors, used sparingly
- [x] Logo: ancient walled city silhouette — preview before adding to code
- [x] Free domain: siyoni.vercel.app
- [x] No user accounts in v1

## 11. Components to Build
| Component | Purpose |
|---|---|
| ImigongoPattern | SVG border/background, configurable colors |
| LiturgicalBanner | Seasonal color band, Misa y'Umunsi only |
| PrayerCard | Title, category, preview text |
| PrayerReader | Full-screen reading mode, large text |
| SaintOfDay | Today's saint widget |
| RosaryGuide | Step-by-step with bead visualization |
| NovenaTracker | Day 1–9 progress indicator |
| SongCard | Title, choir, YouTube embed |