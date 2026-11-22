# Site data

Everything the site says about you lives in the JSON files in this folder. Edit them in VS Code: each file points at a schema in `schemas/`, so you get autocomplete and red underlines for typos, with nothing to install.

| File | What it holds | Used by the site today |
|---|---|---|
| `profile.json` | Name, role, summary, location, email, socials, bios, repo link | **Yes**: landing page, About, Contact, footer, page title, share cards, installable-app name |
| `skills.json` | Skills grouped by category, rated 1 to 5 | **Yes**: Skills |
| `certifications.json` | Courses and certificates (skills listed by name) | **Yes**: Certificates |
| `experience.json` | Jobs, with their references nested inside | **Yes**: Experience timeline |
| `education.json` | Degrees | **Yes**: Education timeline, inside About |
| `projects.json` | Case studies | **Yes**: Projects, linked from Experience |
| `services.json` | What you offer | Not yet |
| `personal.json` | **Sensitive**: birth month/year, address, family (no phone, no full date of birth) | Never (see below) |

## Common edits

- **Change your name, role or summary:** edit `profile.json`. Rebuild and the landing page, browser tab, share cards and app name all follow.
- **Add a skill:** add `{ "name": "...", "rating": 1-5 }` to a group in `skills.json`. `rating` is optional; unrated skills show without the meter.
- **Add a certification:** add an entry to `certifications.json`; its `skills` must match names in `skills.json` exactly.
- **New job:** add to `experience.json`. Leave `end` out for your current job, and set `profile.json`'s `title` to its role. `highlights` are the bullets shown on the timeline and the resume. A project's `company` must match a job's `company`.
- **Moved city:** edit `location` in `profile.json`; `hometown` is shown separately in About.

## The downloadable resume

The Resume section builds the PDF in the visitor's browser when they click Download, from these files, so it is always current:

| Resume part | Comes from |
|---|---|
| Name, headline | `profile.json` → `resumeName`, `headline` (fall back to the full name and `title`) |
| Contact line | `profile.json` → `email`, `location`, and the LinkedIn, GitHub and Portfolio Website `socials` |
| Summary | `profile.json` → `resumeSummary` |
| Experience | `experience.json`, newest first, with `context` and `highlights` |
| Projects | `projects.json`, in file order, using `longDescription` |
| Skills | `skills.json` groups |
| Education | `education.json`, newest first |
| Key achievements | `profile.json` → `achievements` |

Add `"resume": false` to a project, skill group or education entry to keep it on the website but out of the PDF.

**Last updated** is the date of the last commit that changed `src/data` (or today, while you have uncommitted edits there).

**Phone number:** it is not stored in any JSON file. It comes from the `VITE_RESUME_PHONE` environment variable: put it in `.env.local` (git-ignored) for local builds, and add the same variable in Vercel → Project → Settings → Environment Variables for the live site. Without it, the PDF simply has no phone number. The number only appears in the PDF and in the script that builds it, never on the page itself.

## Checks

`npm run build` first runs `npm run check:data`, which stops the build if it finds:
invalid JSON, impossible dates, a job or project ending before it starts, duplicate skills or project slugs, a certification naming a skill that does not exist, or a project naming an unknown company.
Field names and types are checked by TypeScript (`types.ts`) at the same time.

## Using the data in a page

Each dataset has its own tiny loader, so a page only bundles what it imports:

```ts
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";
```

Do not add a file that re-exports everything: it would pull every JSON file into the landing page's JavaScript.

## personal.json is never shipped

It is deliberately not importable through any loader, so it cannot end up in the website's JavaScript. It is still a file in this repository though: if the repository is public, so is that file. Consider deleting it, or adding `src/data/personal.json` to `.gitignore`.
