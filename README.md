# Praveenkumar Muthukumar — Portfolio Website

A fast, responsive, static portfolio focused on **data engineering and software development**. Built with HTML, CSS and plain JavaScript, so it deploys to GitHub Pages without a build step or paid hosting.

## Browse

- **Homepage:** selected work, bio, education, certifications, skills and contacts
- **German Transit Analytics case study:** [projects/german-transit-analytics.html](projects/german-transit-analytics.html)
- **Weather Data Pipeline case study:** [projects/weather-data-pipeline.html](projects/weather-data-pipeline.html)

The two case studies show architecture, problem statements, documented implementation, engineering constraints and links into the actual project source. Other portfolio project cards link directly to their repositories.

## Preview locally

Open `index.html` in your browser. For an HTTP preview, from the repository root:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Validation

Only Node.js is needed for checks, and there are **no npm dependencies**:

```bash
node --check script.js
node --test scripts/check-site.mjs
```

Checks cover page structure, local links, case-study destinations, contact links and previously requested public-content restrictions. GitHub Actions runs the same checks on pull requests and pushes to `main`.

## Publish free with GitHub Pages

This repository is **`Z3raki444/portfolio-website`**.

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **`main`** and **`/(root)`**, then save.
4. Once GitHub finishes publishing, the standard project-site URL is:
   **https://z3raki444.github.io/portfolio-website/**

The URL depends on Pages being enabled and the deployment succeeding. No custom domain or build pipeline is required.

## Maintenance

- Edit `index.html` for homepage text or project cards.
- Edit the two `projects/*.html` files for detailed case studies.
- Edit `styles.css` or `case-studies.css` for visual styling.
- Edit `script.js` for project filters and mobile navigation.
- Keep project descriptions accurate to their linked repository READMEs.

## Privacy and publication notes

- The German and Indian phone numbers, public email address, GitHub and LinkedIn are displayed intentionally at the owner's request.
- No CV or downloadable resume is included yet.
- Academic grades, date of birth, and home address are not displayed.
- The architecture diagrams represent implemented workflows but are **not live feeds**.
- A few project demonstrations are local, not hosted production apps. Case studies identify those limitations.

## Attribution

Project summaries were prepared from the corresponding GitHub repositories. Personal education and certifications were reviewed against the portfolio owner's CV and LinkedIn-export PDF. The supplied photo is retained as `assets/praveenkumar-portrait.webp`.
