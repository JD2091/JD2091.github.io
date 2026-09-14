# Jeet Doshi — portfolio site

Static site. No build step, no dependencies.

```
index.html
assets/
  data.js                 ← all content lives here
  styles.css
  app.js
  Jeet-Doshi-Resume.pdf
  resume-source.html      ← source for the PDF above
README.md
```

## Running it

Double-click `index.html` and it works.

One exception: browsers block outgoing API calls from a page opened directly off disk
(`file://`), so the cover letter generator will fall back to its offline template. To use
a real model locally, serve the folder instead:

```
cd this-folder
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing content

Everything you'd want to change is in **`assets/data.js`** — name, headline, contact links,
the three intro paragraphs, every job and bullet, articles, talks, skills, certifications,
awards, education, and the evidence list the cover letter draws on. Nothing in `app.js`
needs touching.

The site renders from that file at load, so a correction there updates the page and the
cover letters at the same time.

## Cover letter generator

Paste a job description, press **Write the letter**. Output is editable in place, with
Copy, Download .txt, and Save as PDF (which prints the letter alone, no site chrome).

**Model settings** takes a key from Anthropic, OpenAI or Google Gemini. The key is stored
in this browser's local storage and is sent only to the provider you pick — never anywhere
else. Model names are editable text fields; the defaults are placeholders, so put in
whatever model you actually have access to. Anthropic's current model list is at
https://docs.claude.com/en/api/overview.

With no key, or with the provider set to "No model", it uses an offline template that
matches keywords in the job description against your experience. It's serviceable and
completely private, just less fluent.

The prompt instructs the model to use only the facts in `data.js` and never to invent an
employer, metric or certification. That constraint is only as good as the evidence list —
if you add a claim there, it can appear in a letter.

## Deploying later

It's plain static files, so it works as-is on GitHub Pages, Netlify or Vercel with no
changes. If you deploy publicly, remember the phone number and email are in the page
source, and anyone using the cover letter tool supplies their own API key.

## Worth checking before you publish

- The three intro paragraphs and the current-role bullets were drafted from your LinkedIn
  headline and posts. They read as true but they're my words, not yours.
- The GitHub link points to `github.com/UiPathRepositories`. Swap it for your personal
  handle if you'd rather.
- Article links use the `lnkd.in` short URLs from your posts. Direct Hashnode URLs would
  be better for a site that should outlive LinkedIn.
- LinkedIn's skills and certifications sections wouldn't render for extraction, so both
  lists were assembled from your resume and posts. Add anything missing.
