# Pittsburgh overnight parking

A one-night hotel guide for a drive that stops in Pittsburgh on the way to Detroit. The priority is covered or secured garage parking, especially a short walk between the car and the room.

The page is a static site: HTML, CSS, and JavaScript, with no build step, no backend, no paid APIs, and no tracking. It does not take reservations.

Live site, once GitHub Pages is enabled from the `main` branch root:

https://justinwlin.github.io/pittsburgh-overnight-parking/

## What the page says

- **Pittsburgh Marriott North** in Cranberry Woods, near I-79, if an outdoor lot is acceptable. Free uncovered self-parking. Not a secured garage, and not a claim that the suburb is safer.
- **DoubleTree by Hilton Hotel & Suites Pittsburgh Downtown** if a secured garage is nonnegotiable.
- **The Oaklander** in Oakland, onsite valet. Budget the official $50/day and confirm it. The same page conflicts with older $35 wording.
- **Hilton Garden Inn Pittsburgh Downtown** for secured self-parking in the same building.

That order is about setting and parking access. It is not a ranking of neighborhood crime. Downtown is not labeled unsafe.

Room ranges are Visit Pittsburgh’s “Average Room Rate,” with no stay dates. They are not quotes or availability, and taxes and fees are unspecified. Dollar amounts also show Chase-point arithmetic at ×100 (base) and ×50 (Points Boost). That math is not a guaranteed redemption, and parking may not be redeemable.

A secured or secure label is quoted from the source. It is not a guarantee against theft.

## Deploying

The site is the repository root (`index.html`). GitHub Pages should publish the `main` branch from `/` (root). This repo includes `.nojekyll` so Jekyll does not rewrite the page.

After it is enabled, the project URL is:

https://justinwlin.github.io/pittsburgh-overnight-parking/

Local preview, from the repository root:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/

## Updating prices and parking

All facts live in [`js/data.js`](js/data.js).

1. For Visit Pittsburgh averages, edit `room.low` and `room.high`, or `room.amount`. For Marriott North, edit `room.bands`. Keep the caveat in `room.note`: not a quote, taxes and fees unspecified. KAYAK figures are last-two-week Sun–Thu and Fri–Sat averages.
2. Open the hotel’s official parking page and update `parking.feeUsd`, `feeLabel`, `facts`, and `caveats`. Do not turn a listed fee into a per-night total unless the page says so. The DoubleTree $45 figure does not state a billing unit.
3. Change `GUIDE.checked` and `GUIDE.checkedLabel` to the day you re-read the sources.
4. Commit and push to `main`. Pages will republish the same files. There is no build.

Point equivalents are calculated in `js/app.js` from the dollar amounts (`×100` and `×50`). Do not hard-code point totals.

## Adding a hotel

Append one object to `GUIDE.hotels`. Each hotel needs a name, address, neighborhood, room range, parking facts, source links, a safety note, a photo of the actual building, and coordinates.

Look up coordinates once per hotel with [Nominatim](https://nominatim.openstreetmap.org/) or from the OpenStreetMap object itself. Identify the request with a User-Agent, and wait at least one second between lookups. Use the hotel building or hotel node, not a nearby street. Record the OSM id and the query in `geo`.

Prefer an appropriately licensed Wikimedia exterior, with photographer and license. If none exists, use an official hotel image URL and credit it as hotel media without claiming a reuse license. Give the photo a `fallback` or accept the built-in missing-photo message so a blocked image does not collapse the card.

Do not add a property that lacks secured or covered parking and describe it as a safer substitute. Cranberry and Robinson Hilton Garden Inns are documented under `notListed` for that reason.

## Map

Leaflet 1.9.4 is vendored under `vendor/leaflet/`. Tiles come from OpenStreetMap and the map keeps the required OpenStreetMap attribution. Pins are one per hotel, on the hotel coordinate in `js/data.js`.
