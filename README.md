# 144duke.com — site rebuild

Static one-page marketing site for 144 Duke of Gloucester St, Annapolis, MD 21401.
No build step, no dependencies — deploy the contents of this folder to any static
host (Netlify, Cloudflare Pages, GitHub Pages, S3, or the current host).

## Files

- `index.html` — the whole page (SEO meta, Open Graph, and JSON-LD structured data included)
- `assets/css/styles.css` — all styling
- `assets/js/main.js` — header scroll state, mobile menu, reveal animations, form submit
- `assets/img/` — photography (originals pulled from the current 144duke.com)

## Before go-live

1. **Contact form.** The form posts to [FormSubmit](https://formsubmit.co)
   (`formsubmit.co/ajax/manager@144duke.com`). The **first submission** after
   deploy sends an activation email to manager@144duke.com — click the link in
   it once and the form works forever after. No account needed. If you'd rather
   use Formspree/Basin/etc., change the `action` in `index.html` and the fetch
   URL in `main.js`.
2. **Photos.** The kitchen and backyard shots are reused from the old site.
   The site would benefit most from: 2–3 more interior shots (living room,
   bedroom, bath), and a golden-hour exterior. Drop them in `assets/img/` and
   add to the gallery/sections.
3. **Facts to confirm** (sourced from listing sites, worth an owner's eye):
   - "circa 1805" build date (CoStar/apartments.com data; copy hedges with "circa")
   - "Twelve-month terms; longer terms considered"
   - Walking times (marked approximate on the page)
   - Unit mix confirmed by owner (July 2026): eight one-bedrooms, one two-bedroom
4. **Phone number.** The inquiry section lists email only. Add a phone line
   there and in the footer if you want calls.

## Local preview

```sh
python3 -m http.server 4144 --directory 144duke
# → http://localhost:4144
```

## Design notes

Palette is drawn from the building itself: Harbor Ink `#17242D`, Sailcloth
Cream `#FAF6EF`, Oyster `#EFE7DB`, Duke Brick `#9E3B26`, Gloucester Teal
`#2E6E63`, Trim Seafoam `#8FBEB4`. Type is Libre Caslon (Caslon being the
typeface of colonial-era American printing) with Instrument Sans for UI.
Real photos of the property carry a thin seafoam keyline; stock Annapolis
imagery is confined to the Neighborhood section with a unifying grade.
