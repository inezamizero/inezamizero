# Project Initiation Document — Siyoni

**Last updated:** 2026-06-20
**Status:** Planning → Development

## 1. Project Name
**Siyoni** — meaning Zion, the holy mountain, the place of longing for the diaspora.
Tagline: *"Kuko Kiliziya ikuri mu mutima, aho uri hose"*
(Because the Church lives in your heart, wherever you are)

## 2. Problem Statement
Rwandans in the diaspora cannot find Catholic prayers in Kinyarwanda online.
Existing apps (Hallow, iBreviary) are English/French only. This project builds a bridge back.

## 3. Target Users
- Primary: Rwandan Catholics abroad (US, Europe, Canada, Australia)
- Secondary: Rwandans in Rwanda finding prayers online
- Future: Swahili-speaking Catholics, other African language communities

## 4. Five Sections

### Isengesho Rusange (General Prayers)
- Abatagatifu ba buri munsi — saints database, full year
- Misa mu Kinyarwanda — different forms of mass
- Amasengesho yo gusaba ibyo dukeneye — short intercessory prayers
- Kuvugurura — how to go to confession
- Gusenga imbere ya Sakramentu — how to do adoration
- Amasengesho y'Igitondo n'Ijoro — morning and evening prayers
- Ibisingizo — three litanies (Umutima Mutagatifu wa Yezu, Impuhwe z'Imana, Bikira Mariya)

### Rozari (Rosaries & Chaplets)
- Rozari ya Bikira Mariya
- Rozari y'Amaganya
- Ibaba rya Impuhwe z'Imana (Divine Mercy Chaplet)

### Novena
- Novenas from physical books, day-by-day structure (Day 1–9)

### Misa y'Umunsi
- Daily amasomo from a public Catholic API
- Saint of the day
- Pacis TV YouTube link
- Page theme shifts with the liturgical season

### Indirimbo (Songs)
- Searchable alphabetical library
- Source: Igitabo cy'Umukristu + other hymnals
- YouTube links embedded, choir attribution when known

## 5. Tech Stack
| Layer | Tool | Cost |
|---|---|---|
| Frontend | Next.js 14 + Tailwind CSS | Free |
| Animations | Framer Motion + lucide-react | Free |
| Database | Supabase | Free tier |
| Hosting | Vercel | Free tier |
| Repo | GitHub (public) | Free |
| Domain | siyoni.vercel.app to start | Free |

## 6. Monetization
1. Ko-fi donations — ko-fi.com/siyoni (launch day)
2. Google AdSense (when traffic grows)
3. Religious book store (v2)
4. Premium features — offline, PDF downloads (v3)
Key principle: prayers are always free.

## 7. Copyright Strategy
- Traditional Catholic prayers: public domain, safe
- Igitabo cy'Umukristu (Palotti-Presse, 2012): seek written permission before copying
- Songs: YouTube links only until permission obtained
- Daily readings: use public API, never copy-paste

## 8. Phases
### Phase 1 — Today
- [ ] Next.js app in siyoni/app/
- [ ] Homepage with hero, 5 section tiles, Ko-fi button
- [ ] Rozari section working
- [ ] Deployed to Vercel

### Phase 2 — Week 1-2
- [ ] General Prayers section
- [ ] Novenas (3 minimum)
- [ ] Content entry via Supabase

### Phase 3 — Month 1
- [ ] Misa y'Umunsi with real API data
- [ ] Songs section
- [ ] Search

### Phase 4 — Future
- [ ] PWA prayer reminders
- [ ] Book store
- [ ] Swahili version
- [ ] Mobile app