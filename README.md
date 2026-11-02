# Personal website

I use Astro with Markdown content collections so each new build or reading note is one file.

This is a static site with five sections. The home page gives a concise overview of my bio, Monthly Builds, experience, education, and Reading Log. The Project Archive stays on its own page. The layout uses a narrow column, a compact personal header, and understated section labels inspired by ekizior.github.io, with a light background and my own content. There is no backend, browser JavaScript, analytics, remote font, or external image. Astro is the only direct package dependency; npm also installs Astro’s own dependencies. Astro 6.4.8 supports the Node version used for this scaffold.

## Local development

Use Node.js 22.12.0 or newer and npm. The GitHub workflow uses Node 22.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, normally `http://localhost:4321/`. Stop the server with Ctrl+C.

To build and inspect the production output:

```sh
npm run build
npm run preview
```

Astro writes static HTML and CSS to `dist/`. `npm run build` also validates collection frontmatter against the schemas in `src/content.config.ts`. It is not a full TypeScript or accessibility audit. No extra checker or testing dependency is installed.

## Structure

```text
src/
  site.ts                         # My name, bio, contact links, optional headshot
  data/resume.ts                  # Shared experience, education, archive projects
  content.config.ts               # Markdown collection schemas
  content/
    builds/2026-11-poker-ai.md     # One file per monthly build
    reading/sample-note.md        # One file per reading note or post
  pages/
    index.astro                   # Home, led by the latest monthly build
    builds/index.astro            # All monthly builds, newest month first
    builds/[...id].astro          # One generated page per build
    archive/index.astro           # Compact, separate archive list
    reading/index.astro           # Reading notes, newest date first
    reading/[...id].astro         # One generated page per reading entry
    about/index.astro             # Education, experience, research
    404.astro
  components/                     # Build summary, contacts, resource links
  layouts/Base.astro              # Shared navigation, metadata, footer
  lib/                            # Base-aware URLs and UTC date formatting
  styles/global.css               # System fonts, responsive light theme
.github/workflows/deploy.yml      # Manual GitHub Pages deployment
astro.config.mjs                  # Static output and deployment URL settings
CONTENT.md                        # Every placeholder to fill
```

## Add a monthly build

Create one Markdown file in `src/content/builds/`. Its filename becomes the URL slug. For example, `2026-12-project-name.md` becomes `/builds/2026-12-project-name/`. The home page and build index update automatically at build time. No route or list needs editing.

```md
---
title: "TODO: My build title"
month: "2026-12"
status: "in-progress"
summary: "TODO: Add a short first-person summary."
repo: ""
writeup: ""
---

## What it does

TODO: Describe what I made.

## What I learned

TODO: Add my own takeaways.

## What’s next

TODO: Add what I plan to try next.
```

`month` uses `YYYY-MM`. `status` is `in-progress` or `complete`. `repo` and `writeup` accept a full URL or an empty string. Empty fields are omitted from the rendered page. The build page is separate from the external writeup; leave `writeup` empty until the writeup exists. For links to other site pages inside Markdown, use relative URLs so they work with a GitHub Pages subpath.

The November entry records only the supplied milestone: standard-library Python, regret matching on rock-paper-scissors, and a Kuhn poker CFR trainer with a game value close to −1/18. Larger games and the writeup remain unfinished.

## Add a reading note or post

Create one Markdown file in `src/content/reading/`:

```md
---
title: "TODO: My paper title"
date: 2026-12-01
kind: "note"
summary: "TODO: Add a short summary."
paper: ""
placeholder: true
---

TODO: Add my notes.
```

Use `kind: "note"` for a short entry or `kind: "post"` for a longer one. Both get a full page and accept ordinary Markdown, including headings, lists, links, and fenced code blocks. The index sorts by `date`, newest first. Set `placeholder: false` after replacing the sample content. Entries with `placeholder: true` are hidden from every index and get no generated page. Replace or delete the included sample when ready.

## GitHub Pages deployment

The site is configured as the `DevenMittal.github.io` user site. Pushes to `main` build and deploy it through GitHub Actions; the workflow can also be run manually from the Actions tab.

When ready:

1. Fill the placeholders in `CONTENT.md`.
2. Run `npm run build` and `npm run preview` locally when checking a change.
3. Commit and push to `main`. GitHub Actions builds and publishes the static output.
4. In the repository’s **Settings → Pages**, choose **GitHub Actions** as the source if GitHub has not selected it automatically.
5. The completed workflow shows the public URL. Later content updates only require another commit and push.

Reference: [Astro’s GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). Internal navigation uses `src/lib/urls.ts` to preserve the configured base path.

## Editing copy and styles

Start with `CONTENT.md`. Edit the bio and contact details in `src/site.ts`; experience, education, and older projects live in `src/data/resume.ts` and are shared across pages. Missing links stay hidden. To add a headshot, place the image in `public/` and set `site.headshot` to its relative filename, such as `headshot.jpg`. There is no placeholder image box. Keep copy short and first person, and leave future work clearly marked as future work. Global styles live in `src/styles/global.css`. Do not add private resume contact details or copy the resume into `public/`.
