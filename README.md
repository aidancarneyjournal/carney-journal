# Carney Journal

Source for [carneyjournal.com](https://carneyjournal.com) — a personal journal of articles,
statistical analyses, and projects, built with [Eleventy](https://www.11ty.dev/) (a static
site generator) and plain HTML/CSS.

## How it works

- Articles are Markdown files in `src/articles/`. Each one becomes its own page automatically.
- Everything else (Home, Articles list, About, Contact, Donate) lives in `src/*.njk`.
- `npm run build` turns all of it into plain HTML/CSS in `_site/`, which is what actually
  gets hosted. There's no database and no server — just static files.
- A GitHub Actions workflow (`.github/workflows/deploy.yml`) rebuilds and republishes the
  site automatically every time you push to `main`.

## Local setup

You need [Node.js](https://nodejs.org/) installed (any recent LTS version).

```bash
npm install       # one-time setup, installs Eleventy
npm run serve     # starts a local preview at http://localhost:8080, live-reloads on save
npm run build     # builds the production site into _site/
```

## Writing a new article

1. Duplicate `src/articles/college-football-rating-system.md` (or create a new file) inside
   `src/articles/`. The filename becomes the URL, e.g. `src/articles/my-post.md` →
   `/articles/my-post/`.
2. Fill in the front matter at the top of the file:

   ```yaml
   ---
   layout: article.njk
   title: "Your Article Title"
   date: 2026-08-21
   category: Sports Analytics
   status: Working Paper   # Working Paper | Draft | Finished
   summary: "One or two sentences shown on the homepage and articles list."
   draft: false            # set true to hide it from the live site until you're ready
   ---
   ```

3. Write the article body in Markdown below the front matter. Headings (`##`, `###`),
   lists, tables, blockquotes, images, and code blocks all work out of the box and are
   already styled.
4. To hide a work-in-progress article from visitors while you edit it, set `draft: true`.
   Drafts show up when you run `npm run serve` locally (so you can preview them) but are
   excluded from the deployed site.

### Adding images

Put image files in `src/images/` and reference them with a normal Markdown image tag:

```markdown
![Description of the image](/images/your-file.png)
```

### Adding charts and graphs

The example article includes a working [Chart.js](https://www.chartjs.org/) bar chart as a
template — copy the `<div class="chart-container">...</div>` and `<script>` block from
`src/articles/college-football-rating-system.md` and change the data. Chart.js is loaded
from a CDN, so no install is required. For anything more complex (interactive statistical
visualizations), the same pattern works with libraries like
[D3](https://d3js.org/) or [Plotly](https://plotly.com/javascript/).

Plain tables and static images work with regular Markdown syntax and need no extra setup.

## Deploying (free hosting on GitHub Pages)

1. **Create a GitHub repository** and push this project to it (`main` branch).
2. In the repository, go to **Settings → Pages**, and under "Build and deployment" set
   **Source** to **GitHub Actions**. The included workflow will handle the rest — every
   push to `main` rebuilds and republishes the site automatically.
3. Still under **Settings → Pages**, add your custom domain (`carneyjournal.com`) in the
   **Custom domain** field and save. This writes a `CNAME` file check — one is already
   included in this repo (`src/CNAME`) so it should just confirm automatically.
4. **Point your domain at GitHub Pages.** In your domain registrar's DNS settings
   (wherever you bought carneyjournal.com), add:

   | Type | Name | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | your-github-username.github.io |

   DNS changes can take anywhere from a few minutes to a few hours to take effect.
5. Back in **Settings → Pages**, once the domain is verified, check **Enforce HTTPS**.

GitHub Pages is free for public repositories, including the custom domain and HTTPS
certificate. If you'd rather use Netlify or Cloudflare Pages instead (also free, and both
also support custom domains), the setup is nearly identical: connect the GitHub repo, set
the build command to `npm run build` and the publish directory to `_site`.

## Setting up donations

`src/_data/site.js` has a `donateUrl` field — update it once you've picked a platform
(Ko-fi, Buy Me a Coffee, PayPal.me, and GitHub Sponsors are all free and take a few minutes
to set up). The Donate page pulls from that one value.

## Project structure

```
src/
  _includes/       Layout templates (base.njk, article.njk, article-card.njk)
  _data/           Site-wide settings (site.js)
  articles/        Your Markdown articles — one file per article
  css/             Stylesheet
  js/              Reserved for future use
  images/          Images referenced by articles
  index.njk        Home page
  articles.njk     Articles archive/listing page
  about.njk        About page
  contact.njk      Contact page
  donate.njk       Donate page
  CNAME            Custom domain, used by GitHub Pages
.eleventy.js       Eleventy configuration
```
