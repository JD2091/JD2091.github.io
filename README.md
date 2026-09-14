# Jeet Doshi — portfolio site

A static, data-driven portfolio. No build step, no dependencies, no framework.
Live at **https://jd2091.github.io**

One page, one data file, one renderer. Everything on the site — and in the PDF it
exports — comes from a single JavaScript object in `assets/data.js`.

---

## Files

```
index.html                  the page — markup only, no content
.nojekyll                   tells GitHub Pages to serve files as-is
.gitignore
README.md

assets/
  data.js                   ← ALL CONTENT LIVES HERE
  app.js                    renders index.html from data.js
  styles.css                screen styles + the print skin that becomes the PDF
  og.html                   source for the social share card
  og.png                    the rendered 1200×630 share card
  imgs/                     photo used to build og.png
```

## How it works

Three ideas, and that's the whole architecture:

1. **`data.js` defines `window.PROFILE`** — a plain object with `identity`, `positioning`,
   `now`, `closing`, `experience`, `projects`, `writing`, `speaking`, `skills`,
   `certifications`, `awards` and `education`.
2. **`index.html` contains no content.** It is a set of empty containers with `id`
   attributes.
3. **`app.js` fills them in** on `DOMContentLoaded`. Every node is built with
   `createElement` and `textContent` — never `innerHTML` — so nothing in `data.js` can
   inject markup.

Each render function returns early if its target element is missing, so `app.js` is safe
to load on a page that doesn't have every section.

## The PDF is the page

There is no separate resume file. **Download PDF** calls `window.print()`, and the
`@media print` block in `styles.css` reflows the same DOM onto white A4.

That makes parity structural rather than maintained: the PDF *is* the site, so the two
cannot drift. Add a section to `data.js` and it appears in both. Links stay real anchors,
so the exported PDF has clickable URLs.

**The layout is budgeted to 3 A4 pages** at 9pt with two-column cards. That budget is a
property of the current content — adding several more projects or roles will push it to
four. After adding content, print to PDF and check the page count.

## Running it locally

Double-click `index.html`. There is nothing to install or build.

To serve it over HTTP instead — closer to how it behaves deployed, and the only way to
test absolute paths:

```bash
cd this-folder
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing content

Open `assets/data.js`. Everything is there and commented. Fields worth knowing:

- `identity.kicker` / `identity.headline` — the two lines at the top of the hero
- `identity.workMode` — the small badge beside the location. Set to `""` to hide it
- `identity.lastUpdated` — the footer date. **Bump it manually** when you change content;
  it used to be generated from `new Date()`, which meant the site always claimed to be
  current no matter how stale it was
- `now.items` — the six metric cards. Keep to six; the grid is three columns
- `projects` — things you built. `writing` — things you wrote *about* them. Keep separate

---

## Make it your own

Personal details live in more than just `data.js`. Work through this and you'll have a
clean copy.

### 1. Replace the content

Rewrite **`assets/data.js`** end to end.

### 2. Fix the values that live outside `data.js`

These are the ones people miss:

| File | What to change |
|---|---|
| `index.html` | `<title>`, `<meta name="description">`, and the **favicon** — an inline SVG with the initials `JD`; search for `%3EJD%3C` |
| `index.html` | The fallback name in `<h1 class="rail__name" id="railName">` — JS replaces it, but it's what crawlers and no-JS visitors see |
| `index.html` | Every social tag: `canonical`, `og:url`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:image:alt`, `twitter:*`, `author`, `article:author`, `article:published_time`, `profile:*` |
| `index.html` | The **JSON-LD `Person` block** at the end of `<head>` — name, job title, employer, URL, address, `sameAs` links |
| `assets/app.js` | Lines ~194–195 hardcode the **visible label** of the LinkedIn and Articles contact rows while the URLs come from `data.js`. Change both or they'll disagree |
| `assets/og.html` | Name, role, and the photo filename |
| `assets/styles.css` | The name in the header comment (cosmetic) |

Replace everything in `assets/imgs/`.

### 3. Rebuild the share card

`assets/og.png` is what LinkedIn shows when someone posts your link.

1. Put your photo in `assets/imgs/` and point `assets/og.html` at it
2. Edit the text in `assets/og.html`
3. Open it in a browser, set the viewport to exactly **1200 × 630**, screenshot
4. Save as `assets/og.png`

`og.html` pulls Archivo and IBM Plex Mono from Google Fonts, so open it online or the card
falls back to Arial.

### 4. Point the absolute URLs at your domain

`og:image`, `og:url`, `canonical` and the JSON-LD `url`/`image` **must be absolute** —
LinkedIn and X discard a relative `og:image` and show no card at all. Search `index.html`
for `jd2091.github.io` and replace every occurrence.

### 5. Deploy to GitHub Pages

1. Create a **public** repo named exactly `<your-username>.github.io`. Pages from a private
   repo needs a paid plan, and any other repo name serves from a subpath, which breaks the
   absolute URLs from step 4.
2. Push:

   ```bash
   git init -b main
   git add .
   git commit -m "Portfolio site"
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

3. **Settings → Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Wait a minute or two, then open `https://<your-username>.github.io`.

### 6. Check it

- `assets/og.png` loads at its absolute URL
- **Download PDF** produces a 3-page A4 document with clickable links
- The page reads correctly at phone width
- Run the URL through **LinkedIn Post Inspector** once and hit refresh — LinkedIn caches
  scrape results for weeks, so prime it before sharing the link anywhere

---

## Known gotchas

- **The print skin is in `styles.css`, not a separate file.** It must stay that way — the
  PDF is the page, and a second stylesheet is how the two drift apart.
- **Print backgrounds are opt-in.** Readers must enable "Background graphics" for filled
  blocks to appear, so the print skin is deliberately white with coloured text and depends
  on no filled block.
- **The dark theme is set by `data-theme="dark"` on `<html>`.** A full light palette exists
  in `:root` but nothing toggles it. Note that `html[data-theme="dark"]` is more specific
  than `:root`, so overrides must match that specificity — the print block uses
  `html[data-theme], :root` for exactly this reason.
- **Grids collapse in print.** The A4 content box is ~696px, below the 45rem/64rem screen
  breakpoints, so `.record` and `.grid2` need their columns forced explicitly in the print
  block or they silently drop to one column.
- **No tests, no CI.** About 1,400 lines of vanilla JS, HTML and CSS. Check it in a browser.

## Reuse

The structure, styles and rendering code are yours to reuse. The written content and the
photo are not — replace them with your own.
