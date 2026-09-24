# nsave — 1:1 clone

Renders the real nsave.com pages inside a Next.js 15 app: the scraped markup is used
verbatim and styled by nsave's own extracted stylesheet, so nothing is re-designed.

## How a page is built

1. **Scrape** — each route's server HTML is stored in `scraped/html/<page>.html`
   (real markup plus nsave's serialized router payload).
2. **Split** — `<header>`, `<main>` and `<footer>` are cut into
   `components/exact/<page>-{header,main,footer}.html`, which each route imports
   through `raw-loader` (`html.d.ts` declares the `*.html` module).
3. **Answers** — nsave renders FAQ answers only on interaction, so
   `scripts/inject-faq.mjs` bakes the real answer text (from nsave's own payload and
   JS chunks, kept in `components/exact/faq.json`) into the markup using nsave's own
   collapse pattern: `grid-rows-[0fr] -> grid-rows-[1fr]`.
   Re-run it with `npm run inject-faq` (idempotent, renumbers panel ids per file).
4. **Render** — `components/ExactPage.tsx` injects the markup and boots the behaviours.

## Behaviour layer

| file | what it does |
| --- | --- |
| `components/wire.ts` | mega-menu (hover/click/Escape), FAQ accordion, country selector |
| `components/animations.ts` | hero state machine, stats marquee, rating roll-up, scroll reveals |

All of it mirrors nsave's own implementation rather than approximating it:

- the hero is the original `hero-load--pending/--animating/--settled` CSS machine,
  settled after the durations declared in its own `--hero-*-ms` custom properties;
- the stats strip uses nsave's `stats-marquee-ltr` keyframes and `--marquee-distance`;
- the mega-menu animates the CSS `translate`/`opacity` properties (the utilities it
  names, like `translate-y-[32px]`, are not in nsave's stylesheet, so inline styles
  are what the live site actually animates);
- rating digits roll up from `translateY(calc(0 * 1lh))` to the value nsave
  server-rendered, driven by the enclosing section entering the viewport;
- reduced-motion is respected (marquee and reveals switch off, as in nsave's CSS).

## Commands

```
npm run dev        # http://localhost:3000 (or PORT=3001 npm run dev)
npm run build      # static prerender of all 18 routes
npm run typecheck
npm run inject-faq
```

## Known gaps

- `Learn` in the header is a single link in nsave's markup (no dropdown to copy).
- The mobile menu button is client-only on nsave.com, so it is absent from the
  scraped markup; narrow viewports currently have no nav.
- The two custom Tailwind component sets from the first attempt (`components/Header.tsx`
  and friends) are no longer referenced by any route.
