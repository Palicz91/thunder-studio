# Thunder Studio

Music rehearsal rooms & recording studio website. Part of Thunder Venture Group.

## Stack
- Astro 7 (static output)
- Tailwind CSS v4 (via @tailwindcss/vite plugin — no tailwind.config.js)
- React 19 (for interactive islands)
- i18n: TH (default) + EN with prefixed routing
- Deploy: Netlify (auto-deploy from GitHub)

## Design system
Matches Thunder Venture Group branding:
- Dark monochrome palette: #0f0e0e (onyx) / #f4f4f4 (clinical)
- Fonts: Montserrat (Latin) + Noto Sans Thai
- Thunder bolt icon throughout
- Film grain overlay on dark sections

## Image hosting
Supabase Storage (medbot project: qwhacqvkppragsulrkig), bucket: `thunder-studio`
URL pattern: `https://qwhacqvkppragsulrkig.supabase.co/storage/v1/object/public/thunder-studio/images/{filename}.webp`

## Key files
- `src/i18n/ui.ts` — All translations (TH/EN)
- `src/data/rooms.ts` — Room data (name, description, capacity, equipment, images)
- `src/pages/[lang]/index.astro` — Main landing page (all sections)
- `src/layouts/Base.astro` — HTML layout with SEO + JSON-LD
- `src/styles/global.css` — Tailwind v4 theme + custom styles

## Rooms (branded names, 2026-08-10)
- **Studio 1** (formerly "Large Room") — 6-10 capacity, full band rehearsals
- **Studio 2** (formerly "Small Room") — 2-4 capacity, compact private
- **Control Room** — 2-3 capacity, recording/mixing/mastering
- All defined in `src/data/rooms.ts`, rendered at `/rooms/{slug}`

## Pages
- **Core**: landing, about, location, services, privacy, terms
- **Room detail**: 3 rooms at `/rooms/{slug}`
- **i18n**: All pages support TH/EN with `[lang]` route prefix

## Blog (10 posts)
SEO-driven content across band rehearsal, recording, studio selection, Bangkok local:
- Pillars: "What is a rehearsal room?", "Music rehearsal rooms in Bangkok"
- Guides: preparation, equipment, room selection, mixing/mastering, podcast studio
- All in `src/pages/blog/`
- Linked in `public/llms.txt` for AI crawler discovery

## Booking Components
- `SimplyBooking.tsx` — Simply Booking integration (primary)
- `CalBooking.tsx` — Cal.com integration
- `BookingForm.tsx` — custom form fallback
- `Gallery.tsx` + `RoomGallery.tsx` — visual room tours

## SEO
- Strategy doc: `docs/thunder-studio-seo-strategy-v2.md`
- `public/llms.txt` — AI crawler discovery (ChatGPT, Claude, Perplexity)
- JSON-LD structured data in Base.astro

## Dev
```
npm run dev     # start dev server
npm run build   # build for production
```
