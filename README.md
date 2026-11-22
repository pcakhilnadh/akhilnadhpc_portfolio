# akhilnadhpc portfolio

A fresh rebuild in a monochrome NeoPOP style.

## Stack

- [Vite](https://vitejs.dev) + React 18 + TypeScript
- Plain CSS with design tokens in `src/styles.css` (no UI framework)

## Structure

```
index.html
src/
  main.tsx      entry
  App.tsx       hello page
  styles.css    monochrome NeoPOP tokens + components
  data/         portfolio content (profile, skills, projects, blogs, ...)
public/         static assets
```

## Scripts

```bash
npm install
npm run dev      # http://localhost:5000
npm run build    # type-check + production build to dist/
npm run preview
```

Deployed on Vercel via `vercel.json`.
