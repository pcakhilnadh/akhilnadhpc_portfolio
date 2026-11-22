import { Vector2, Vector3 } from "three";

/**
 * Mutable per-frame state shared by the scene components.
 * Lives outside React on purpose: it changes every frame.
 */
export const stage = {
  /** Pointer in normalised device coords relative to the stage (-1..1). */
  pointer: new Vector2(0, 0),
  /** performance.now() of the last real pointer movement. */
  lastMove: 0,
  /** Head centre in world space and its on-screen size (world units). */
  head: new Vector3(),
  headNdc: new Vector2(),
  headSize: 1,
  /** Visible world size at z = 0. */
  view: new Vector2(1, 1),
  /** 0..1 energy burst (clicks, flings) that pulses the backdrop. */
  excite: 0,
  reducedMotion: false,
};

export const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** True when a DOM pointer event started on a real control we should not hijack. */
export const fromControl = (e: Event) =>
  e.target instanceof Element && Boolean(e.target.closest("a,button,input,textarea,select,[data-no-stage]"));
