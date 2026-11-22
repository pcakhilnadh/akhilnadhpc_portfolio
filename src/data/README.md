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
- **Add a skill:** add `{ "name": "...", "rating": 1-5 }` to a group in `skills.json`.
- **Add a certification:** add an entry to `certifications.json`; its `skills` must match names in `skills.json` exactly.
- **New job:** add to `experience.json`. Leave `end` out for your current job. A project's `company` must match a job's `company`.

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
