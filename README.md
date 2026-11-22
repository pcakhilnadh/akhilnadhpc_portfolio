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
  App.tsx                   app shell: Navbar + Home + Footer
  pages/
    Home.tsx                the inner app: lays out avatar, chat and personal info (home.css)
  components/layout/
    Navbar.tsx              top bar (nav + hamburger appear once config/site.ts navLinks has entries)
    Footer.tsx              one thin line: name + repo link
  features/
    profile/
      PersonalInfo.tsx      right side: role / location tags, name, intro
    avatar/
      Avatar.tsx            the avatar area: hosts Avatar2D + Avatar3D and crossfades between them
      Avatar2D.tsx          static portrait (resting state, no-WebGL fallback)
      Avatar3D.tsx          lazy-loaded 3D avatar (mounts on open, unmounts on close)
      AvatarStage.tsx       <Canvas>, framing rig, pointer tracking (inside Avatar3D)
      controller.ts         avatar state (supported / active / ready) + commands: open(), close(), play(), say()
      useAvatarState.ts     React hook for that state
      stageLoader.ts        lazy-loads the 3D chunk; preloads it on button hover
      framing.ts            per-layout placement (mobile/tablet/wide)
      chat/AvatarChat.tsx   "Say hi" button, loading state, the avatar message + close;
                            the one place to build STT / AI reply / TTS
      scene/                Head (GLB rig), RollNeck (turtleneck), Halo, Papers, Backdrop, monochrome shader
  config/site.ts            what the site shows (name, title, intro, repo link, nav)
  data/                     portfolio content (profile, skills, projects, blogs)
  hooks/                    layout, media-query and PWA-install hooks
  styles/                   tokens, base, NeoPOP primitives (component styles live next to components)
public/
  models/akhil-head.glb     optimised runtime model (meshopt + WebP, ~0.8 MB)
  images/                   poster + social preview
design/avatar/              source art: .blend, source GLB, references (not shipped)
```

## Avatar flow

1. The page shows the static portrait and a **Say hi to my avatar** button. Nothing 3D is downloaded.
2. Click: the 3D chunk and model load (hovering the button warms them), the portrait crossfades to the 3D avatar, which nods and shows one message.
3. **✕** (or Esc) unmounts the 3D stage and returns to the portrait and button.
4. Devices without WebGL keep the portrait and are not offered the button.

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
