# akhilnadhpc portfolio

Monochrome NeoPOP portfolio with an interactive 3D avatar. Installable as a PWA.

## Stack

- Vite + React 19 + TypeScript
- three.js via `@react-three/fiber` (lazy-loaded; the page paints before 3D loads)
- `vite-plugin-pwa` (Workbox) for offline + install
- Plain CSS design tokens, no UI framework

## Structure

```
src/
  config/site.ts            what the site shows (name, title, links)
  data/                     portfolio content (profile, skills, projects, blogs)
  features/avatar/
    controller.ts           event bus: avatar.play('Nod'), avatar.say('…')
    framing.ts              per-layout placement (mobile/tablet/wide) + variant (head/bust/full)
    Avatar.tsx              poster fallback, lazy 3D stage, speech bubble
    AvatarStage.tsx         <Canvas>, framing rig, pointer tracking
    scene/                  Head (GLB rig), RollNeck (turtleneck), Halo, Papers,
                            Backdrop, monochrome shader patch
  sections/                 Hero + landing sections
  components/layout/        Header, Footer
  styles/                   tokens, base, NeoPOP primitives, layout
public/
  models/akhil-head.glb     optimised runtime model (meshopt + WebP, ~0.8 MB)
  images/                   poster + social preview
design/avatar/              source art: .blend, source GLB, references (not shipped)
```

## Avatar model

Regenerate the runtime model after exporting from Blender:

```bash
npx @gltf-transform/cli optimize design/avatar/akhilnadhpc.source.glb public/models/akhil-head.glb \
  --compress meshopt --texture-compress webp --texture-size 1024 \
  --join false --flatten false --instance false --simplify false
```

Node names `CharacterRoot`, `Head`, `Eye_L/R`, `Lid_L/R` and clips `Nod`, `Shake`,
`LookAround`, `Blink` are used by the scene and must be kept.

## Scripts

```bash
npm install
npm run dev        # http://localhost:5000
npm run build      # type-check + production build + service worker
npm run preview
npx pwa-assets-generator   # regenerate icons from public/logo.svg
```
