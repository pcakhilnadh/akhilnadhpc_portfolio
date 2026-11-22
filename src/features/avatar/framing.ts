/**
 * Where (and how big) the avatar sits for each layout.
 *
 * Coordinates are relative to the avatar stage (the canvas box):
 *  - "wide"    stage = whole hero; figure on the left, copy on the right.
 *              Used on desktop, landscape tablets and landscape phones.
 *  - "tablet"  stage = top block of the hero; copy flows below it.
 *  - "mobile"  same stacked layout, tuned for narrow portrait screens.
 *
 * `variant` picks the model. Today every layout uses "head" (head GLB +
 * roll-neck). A modelled bust / full-body GLB can add "bust" / "full" later,
 * e.g. full body on wide screens and head-only on phones.
 *
 * Keep the media query in layout.css (`--wide`) in sync with `layoutFor`.
 */
export type Layout = "mobile" | "tablet" | "wide";
export type AvatarVariant = "head" | "bust" | "full";

export interface Framing {
  variant: AvatarVariant;
  /** Head centre in stage NDC (-1..1, y up). */
  x: number;
  y: number;
  /** Head width (hat brim) as a fraction of the stage's smaller side. */
  size: number;
  /** Floating paper count. */
  papers: number;
}

export const FRAMING: Record<Layout, Framing> = {
  mobile: { variant: "head", x: 0, y: 0.06, size: 0.72, papers: 5 },
  tablet: { variant: "head", x: 0, y: 0.06, size: 0.6, papers: 6 },
  wide: { variant: "head", x: -0.42, y: 0.04, size: 0.52, papers: 8 },
};

/** Mirrors `@media (min-width: 1024px), (min-width: 640px) and (min-aspect-ratio: 6/5)`. */
export function layoutFor(width: number, height: number): Layout {
  if (width >= 1024 || (width >= 640 && width / height >= 1.2)) return "wide";
  if (width >= 640) return "tablet";
  return "mobile";
}
