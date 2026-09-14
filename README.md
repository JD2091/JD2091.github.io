# Jeet Doshi — portfolio site

A static, data-driven portfolio and resume. No build step, no dependencies, no framework.
Live at **https://jd2091.github.io**

Everything on the site renders at load time from a single JavaScript object in
`assets/data.js`. Correct a fact there and the homepage, the resume page and the
cover-letter generator all change together.

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | The portfolio — intro, selected work, experience, writing, talks, toolkit, credentials, recognition, contact |
| `resume.html` | A resume rendered from the same data, with an **Export PDF** button that prints to A4 |
| `extras.html` | A private cover-letter generator. **Not in this repo** — see [The cover-letter tool](#the-cover-letter-tool) |

## Files

```
index.html                  portfolio page — markup only, no content
resume.html                 resume page — markup only, no content
.nojekyll                   tells GitHub Pages to serve files as-is
.gitignore                  keeps the private tool out of the repo

assets/
  data.js                   ← ALL CONTENT LIVES HERE
  app.js                    renders index.html
  resume.js                 renders resume.html
  styles.css                site styles + print rules for the portfolio
  resume.css                resume styles + A4 print rules
  og.html                   source for the social share card
  og.png                    the rendered 1200×630 share card
  imgs/                     photo used to build og.png
```

## How it works

Three ideas, and that's the whole architecture:

1. **`data.js` defines `window.PROFILE`** — a plain object with `identity`, `positioning`,
   `now`, `closing`, `experience`, `projects`, `writing`, `speaking`, `skills`,
   `certifications`, `awards`, `education`, `resume` and `coverLetter`.
2. **The HTML files contain no content.** They are empty containers with `id` attributes.
3. **`app.js` and `resume.js` fill them in** on `DOMContentLoaded`. Every node is built with
   `createElement` and `textContent` — never `innerHTML` — so nothing in `data.js` can inject
   markup.

Each render function returns early if its target element is missing, which is why one
`app.js` can safely serve pages with different structures.

## Running it locally

Double-click `index.html`. That's it for the portfolio and resume.

To serve it properly (needed only for the cover-letter tool, which browsers block on
`file://`):

```bash
cd this-folder
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing content

Open `assets/data.js`. Everything is there and commented. A few fields worth knowing:

- `identity.kicker` and `identity.headline` — the two lines at the top of the hero
- `identity.lastUpdated` — the footer date. **Bump it manually** when you change content;
  it used to be generated from `new Date()`, which meant the site always claimed to be
  current no matter how stale it was
- `now.items` — the six metric cards. Keep to six; the grid is three columns
- `experience[].resumeExtra` — optional extra bullets shown **only** on the resume, so the
  site can stay brief while the resume stays thorough
- `projects` — things you built. `writing` — things you wrote *about* them. Keep them separate

---

## Make it your own

This is a personal site, so personal details are baked into more than just `data.js`.
Work through this list and you'll have a clean copy.

### 1. Replace the content

Rewrite **`assets/data.js`** end to end. Every section of both pages comes from here.

### 2. Fix the values that live outside `data.js`

These are the ones people miss:

| File | What to change |
|---|---|
| `index.html` | `<title>`, `<meta name="description">`, and the **favicon** — it's an inline SVG with the initials `JD`, search for `%3EJD%3C` in the `<link rel="icon">` tag |
| `index.html` | The fallback name in `<h1 class="rail__name" id="railName">` — it's replaced by JS, but it's what search engines and no-JS visitors see |
| `index.html` | Every social tag: `canonical`, `og:url`, `og:site_name`, `og:title`, `og:description`, `og:image`, `og:image:alt`, `twitter:*`, `author`, `article:author`, `article:published_time`, `profile:*` |
| `index.html` | The **JSON-LD `Person` block** near the bottom of `<head>` — name, job title, employer, URL, address, `sameAs` links |
| `resume.html` | `<title>` and the same `JD` favicon |
| `assets/resume.js` | Line ~23 appends a hardcoded specialism to the job title: `I.role + " — Intelligent & Agentic Automation"` |
| `assets/app.js` | Lines ~191–192 hardcode the **visible label** of the LinkedIn and Articles contact rows, while the URLs come from `data.js`. Change both or they'll disagree |
| `assets/og.html` | Name, role and the photo filename |
| `assets/styles.css` | The name in the header comment (cosmetic) |

Delete `assets/Jeet-Doshi-Resume.pdf` and everything in `assets/imgs/`.

### 3. Rebuild the share card

`assets/og.png` is what LinkedIn shows when someone posts your link.

1. Put your photo in `assets/imgs/` and point `assets/og.html` at it
2. Edit the text in `assets/og.html`
3. Open it in a browser, set the viewport to exactly **1200 × 630**, and screenshot it
4. Save as `assets/og.png`

`og.html` loads Archivo and IBM Plex Mono from Google Fonts, so open it online or the
card falls back to Arial.

### 4. Point the absolute URLs at your domain

`og:image`, `og:url`, `canonical` and the JSON-LD `url`/`image` **must be absolute**.
LinkedIn and X discard a relative `og:image` and show no card at all. Search `index.html`
for `jd2091.github.io` and replace all occurrences with your own origin.

### 5. Deploy to GitHub Pages

1. Create a **public** repo named exactly `<your-username>.github.io`. Pages from a private
   repo needs a paid plan. Any other repo name serves the site from a subpath, which breaks
   the absolute URLs from step 4.
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
- `resume.html` renders and **Export PDF** produces a clean A4 document
- `Ctrl+P` on the homepage prints the page, not a blank sheet
- Run the URL through **LinkedIn Post Inspector** once and hit refresh — LinkedIn caches
  scrape results for weeks, so prime it before you share the link anywhere

---

## The cover-letter tool

`extras.html` pastes in a job description and drafts a cover letter, either from an LLM API
or an offline keyword template. It is **deliberately excluded from this repo** by
`.gitignore`, along with `assets/coverletter.css`, because it stores an API key in browser
`localStorage` and calls provider APIs directly from the page. That is fine on your own
machine and wrong on a public URL.

The code that drives it still lives in `assets/app.js` (roughly lines 225–545: key storage,
Anthropic/OpenAI/Gemini clients, prompt builder, offline template). It is inert without
`extras.html` — every listener is behind an `if ($("generate"))` guard — but it does mean
the public site downloads about 24 KB of JavaScript it never runs. If you don't want the
tool, delete that block.

## Known gotchas

- **Print styles are page-specific.** `styles.css` prints the portfolio; `resume.css` prints
  the resume; `coverletter.css` prints the letter alone. They must not be merged — the
  cover-letter rules hide every section that isn't the letter, which on any other page means
  all of them.
- **The dark theme is set by `data-theme="dark"` on `<html>`.** A full light palette exists in
  `:root` but nothing toggles it. If you add a toggle, note that `html[data-theme="dark"]` is
  more specific than `:root`, so overrides need to match that specificity — the print block
  uses `html[data-theme], :root` for exactly this reason.
- **No tests, no CI.** It's ~2,200 lines of vanilla JS, HTML and CSS. Check it in a browser.

## Reuse

The structure, styles and rendering code are yours to reuse. The written content, the
resume and the photo are not — replace them with your own.
