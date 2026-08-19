# Thunder Studio

Music rehearsal rooms and recording studio website for [Thunder Studio](https://thunderstudio.co), part of Thunder Venture Group. Located in Don Mueang, Bangkok.

Live site: **thunderstudio.co**

## Tech stack

- **Astro 7** — static site generation
- **Tailwind CSS v4** — utility-first styling (via `@tailwindcss/vite`, no config file)
- **React 19** — interactive islands (booking widget, galleries)
- **Framer Motion** — scroll animations
- **Fonts**: Montserrat (Latin) + Noto Sans Thai

## Getting started

```bash
npm install
npm run dev       # dev server at localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview production build locally
```

### Environment variables

Create a `.env` file in the project root:

```
PUBLIC_SB_API_KEY=<SimplyBook.me API key>
```

## Project structure

```
src/
  config.ts             # Shared constants (image CDN base URL)
  data/rooms.ts         # Room definitions (name, capacity, equipment, images)
  i18n/ui.ts            # All translations (Thai + English)
  layouts/Base.astro    # HTML shell, SEO meta, JSON-LD structured data
  components/           # Astro + React components
    SimplyBooking.tsx    # SimplyBook.me booking widget
    Gallery.tsx          # Image gallery with lightbox
    RoomGallery.tsx      # Room-specific gallery
    SiteHeader.astro     # Navigation header
    SiteFooter.astro     # Footer
    ScrollReveal.astro   # Scroll animation wrapper
  pages/[lang]/         # All routes (TH/EN bilingual)
    index.astro          # Landing page
    about.astro          # About us
    services.astro       # Services overview
    location.astro       # Map and directions
    rooms/               # Individual room detail pages
    blog/                # SEO blog posts (10 articles)
  styles/global.css     # Tailwind v4 theme + custom styles
```

## i18n

All pages are bilingual (Thai + English) with `[lang]` route prefix:
- `/th/` — Thai (default)
- `/en/` — English

Translations live in `src/i18n/ui.ts`.

## Rooms

| Room | Capacity | Use case |
|------|----------|----------|
| Studio 1 | 6-10 | Full band rehearsals |
| Studio 2 | 2-4 | Compact private sessions |
| Control Room | 2-3 | Recording, mixing, mastering |

Room data is defined in `src/data/rooms.ts`.

## Design system

- **Dark monochrome palette**: onyx `#0f0e0e`, clinical `#f4f4f4`
- **Accent**: electric highlight on CTAs
- **Typography**: Montserrat (headings + body), Noto Sans Thai
- **Film grain overlay** on dark hero sections

## Deployment

Auto-deploys from GitHub via Netlify. Push to `main` triggers a build.

## Docs

- `docs/thunder-studio-seo-strategy-v2.md` — SEO strategy and keyword targets
- `CLAUDE.md` — Development reference for AI-assisted workflows
