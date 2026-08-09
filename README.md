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

## Before going live

All four are marked `TODO` in the source.

1. **`CONFIG.checkoutUrl`** in `script.js` — your Gumroad / Stripe / Lemon Squeezy link. While empty, the buy button just rests on the pricing card.
2. **`CONFIG.formEndpoint`** in `script.js` — your email provider's endpoint. While empty, the opt-in validates and shows the confirmation but sends nothing (it logs a console warning).
3. **Real domain** in `index.html` — the canonical link, `og:url`, `og:image`, and the JSON-LD `url`/`image` fields all point at `example.com`.
4. **Contact email and Privacy / Terms links** in the footer.

`CONFIG.price` in `script.js` sets the price everywhere on the page; the literals in the HTML are the no-JS fallback.

> **The three testimonials are placeholder copy** carried over from the prototype. Replace them with real, attributed quotes before publishing — presenting fabricated reviews as genuine is a legal problem in most markets.

## Assets

The cover was extracted from the prototype bundle at 1587×2245 and optimized to WebP (1.5MB → 39KB).

- `book-cover.webp` / `book-cover@1x.webp` — what the page loads
- `book-cover.png` — untouched full-resolution original
- `book-cover.jpg` / `book-cover@1x.jpg` — JPEG spares; only the 1x is used, as the apple-touch-icon
- `og-cover.jpg` — 1200×630 social share card

## Notes

Verified in Chrome at 1440px and 390px: scroll reveals, the tally-mark draw, the sticky buy bar, no horizontal overflow, and `prefers-reduced-motion` all behave. Fonts load from Google Fonts (Archivo + Source Serif 4).
