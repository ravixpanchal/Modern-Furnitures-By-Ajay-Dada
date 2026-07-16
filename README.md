# Modern Furnitures by Ajay Dada — Website

A complete, self-contained website: hero banner, infinite photo showcase,
categories, filterable gallery (all 86 photos), materials, why-choose-us,
stats counters, testimonials, video gallery, FAQ, contact section with
WhatsApp/Call/Map/Facebook, floating WhatsApp + Call buttons, English/Hindi
language switcher, and dark/light theme — all in plain HTML/CSS/JS
(no build step, no framework, nothing to install to run it).

## 1. Folder structure

```
site/
├── index.html                 ← the whole page
├── manifest.json              ← auto-generated list of your photos (do not hand-edit)
├── generate-manifest.mjs      ← run this after adding/removing photos
├── css/style.css
├── js/
│   ├── config.js              ← ⭐ EDIT THIS: phone, WhatsApp, map, Facebook, testimonials, FAQ, videos
│   ├── translations.js        ← English/Hindi text for menus & headings
│   └── script.js              ← site logic (sliders, filters, lightbox, theme, language)
├── furnitures/                ← put all 86 photos here (flat, any filenames)
└── furnitures_class/
    ├── Bedroom/
    ├── Customs/
    ├── Kitchens/
    ├── Living rooms/
    └── Wardrobe/
```

The `furnitures/` and `furnitures_class/*` folders currently contain a few
placeholder `.svg` images (wood-toned cards with a label) so the site looks
correct out of the box. **Delete them and drop in your real `.jpg`/`.png`
photos** — filenames don't matter, just put the right photo in the right
folder.

## 2. Add your photos

1. Copy all 86 photos into `furnitures/` (delete the placeholder `.svg` files first).
2. Copy the category-sorted photos into the matching folder inside
   `furnitures_class/` (Bedroom, Customs, Kitchens, "Living rooms", Wardrobe).
   A photo can exist in both `furnitures/` (the full 86) and in a category
   folder (for filtering) — they don't need to be the same file.
3. Re-run the manifest generator any time you add or remove photos:

   ```bash
   node generate-manifest.mjs
   ```

   This scans both folders and rewrites `manifest.json`, which the website
   reads to build the hero slider, the infinite showcase, the category tiles
   and the filterable gallery — automatically, no manual coding.

   Requires Node.js 18+. If you don't have Node installed, download it free
   from https://nodejs.org (LTS version), or ask any developer to run this
   one command for you whenever photos change.

## 3. Edit your contact details

Open `js/config.js` in any text editor and update:

- `phoneDisplay` / `phoneDial` — your phone number
- `whatsappNumber` — country code + number, digits only (e.g. `919876543210`)
- `whatsappMessage` — the pre-filled message people send you
- `mapsEmbedSrc` — Google Maps → Share → **Embed a map** → copy the `src="..."` URL
- `mapsShareLink` — Google Maps → Share → **Copy link**
- `addressLines` — your workshop address (English + Hindi)
- `facebookUrl` — your Facebook page link
- `instagramUrl` — optional; leave blank (`""`) to hide the Instagram icon
- `testimonials`, `faqs`, `videos`, `materials`, `stats` — edit freely, add
  or remove entries in the same format

Every contact button on the site (hero buttons, floating WhatsApp/Call
buttons, contact section, footer) reads from this one file — you only edit
it once.

## 4. Add videos (optional but recommended)

In `js/config.js`, inside `videos: [ ... ]`, add entries like:

```js
{ title: { en: "Workshop Tour", hi: "वर्कशॉप टूर" }, youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX" }
```

or for a local video file placed in `/videos`:

```js
{ title: { en: "Kitchen Installation", hi: "किचन इंस्टॉलेशन" }, file: "videos/kitchen-install.mp4" }
```

## 5. View the site locally

Because the site loads `manifest.json` with `fetch()`, opening `index.html`
directly by double-clicking it (a `file://` URL) will block that request in
most browsers. Instead, serve the folder with any tiny local server:

```bash
# Option A — Python (already on most computers)
python3 -m http.server 8000
# then open http://localhost:8000

# Option B — Node
npx serve .
```

## 6. Publish it online

This is a static site — it works on **any** static host:

- **Netlify / Vercel**: drag-and-drop the whole `site/` folder onto their
  dashboard, done.
- **GitHub Pages**: push this folder to a GitHub repo and enable Pages in
  the repo settings.
- **Any shared hosting (cPanel, Hostinger, GoDaddy, etc.)**: upload the
  whole folder via FTP into `public_html/`.

No database, no PHP, no server-side code required.

## 7. Customizing further

- Colors, fonts and spacing: all defined as CSS variables at the top of
  `css/style.css` (look for `:root` and `html[data-theme="dark"]`).
- Section copy/headings (English + Hindi): `js/translations.js`.
- Section order: reorder the `<section>` blocks in `index.html` — the nav
  links use `#id` anchors so update both together if you rename a section.

---

Built for **Modern Furnitures by Ajay Dada** — custom furniture, modular
kitchens, wardrobes and interior woodwork.
