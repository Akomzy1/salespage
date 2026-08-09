# The Attention Reset — sales page

Static sales page for the ebook *The Attention Reset: The 30-Day Protocol to Reclaim Your Focus*.

No build step. Open `index.html`, or serve the folder:

```sh
python -m http.server 8000
```

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The page. Semantic markup, OG/Twitter cards, Book + FAQPage JSON-LD. |
| `styles.css` | Design tokens and all styling. |
| `script.js` | Price/checkout wiring, scroll reveals, sticky buy bar, opt-in form. |
| `assets/` | Cover derivatives and the social share card. |
| `Attention Reset Sales Page.html` | The original bundled prototype this was built from. Source of truth for the design; not served. |

## Checkout

The buy button on the offer card links to the Stan Store listing:

```
https://stan.store/battleplan/p/the-attention-reset-30day-focus-protocol
```

It's hard-coded in `index.html` rather than set from `script.js`, so the most important link on the page survives a JS failure. The hero, sticky-bar, and closing CTAs all scroll down to the offer card instead of jumping straight to checkout — readers see the price, the inclusions, and the guarantee before they leave the page. To send them direct instead, swap those three `href="#pricing"` values for the Stan URL.

## Before going live

Both are marked `TODO` in the source.

1. **Real domain** in `index.html` — the canonical link, `og:url`, `og:image`, and the JSON-LD `url`/`image` fields all point at `example.com`.
2. **Contact email and Privacy / Terms links** in the footer.

## Pricing

`CONFIG.price` sets the price everywhere on the page; the literals in the HTML are the no-JS fallback. `CONFIG.listPrice` sets the struck-through anchor on the offer card, and `''` removes it.

> The anchor price should reflect a price the book has genuinely sold at. Invented "was" prices are treated as deceptive pricing by the FTC and equivalent regulators, and the claim is easy to check against your checkout history.

The JSON-LD `offers.price` is deliberately the real price only — the anchor is presentational and is not published as structured data.

## Social proof

The page has no testimonials. The "Built on the research of" row credits published work rather than claiming endorsement, so it needs no substantiation. If you add reader quotes later, they need to be real and attributable.

## Assets

The cover was extracted from the prototype bundle at 1587×2245 and optimized to WebP (1.5MB → 39KB).

- `book-cover.webp` / `book-cover@1x.webp` — what the page loads
- `book-cover.png` — untouched full-resolution original
- `book-cover.jpg` / `book-cover@1x.jpg` — JPEG spares; only the 1x is used, as the apple-touch-icon
- `og-cover.jpg` — 1200×630 social share card

## Notes

Verified in Chrome at 1440px and 390px: scroll reveals, the tally-mark draw, the sticky buy bar, no horizontal overflow, and `prefers-reduced-motion` all behave. Fonts load from Google Fonts (Archivo + Source Serif 4).
