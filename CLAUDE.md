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

## Dev
```
npm run dev     # start dev server
npm run build   # build for production
```
