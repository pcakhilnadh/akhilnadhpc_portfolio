import { forwardRef, useEffect, useMemo } from "react";
import {
  BackSide,
  Color,
  DataTexture,
  type Group,
  LatheGeometry,
  MeshBasicMaterial,
  MeshToonMaterial,
  NearestFilter,
  RedFormat,
  Vector2,
} from "three";
import { monochromize } from "./monochrome";

/**
 * Ribbed black roll-neck that sits under the head-only GLB, matching the
 * turtleneck in the reference art. Units are the GLB's model space: the
 * chin sits at y ≈ -0.03 and the neck centre at (0.012, -0.045).
 */

const NECK = { x: 0.012, z: -0.045 };

/** Lathe profile: snug under the jaw, ribbed rolls, then closes in a rounded base. */
function rollNeckGeometry() {
  const pts: Vector2[] = [];
  const top = 0.03;
  const bottom = -0.1;
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = top + (bottom - top) * t;
    const r = 0.047 + 0.016 * Math.pow(t, 2.4) + 0.003 * Math.sin(t * Math.PI * 8) * (t > 0.12 ? 1 : 0);
    pts.push(new Vector2(r, y));
  }
  // Rounded base so the collar reads as a finished cut, not an open tube.
  const rBase = pts[pts.length - 1].x;
  for (let i = 1; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2);
    pts.push(new Vector2(rBase * Math.cos(a), bottom - 0.022 * Math.sin(a)));
  }
  const geo = new LatheGeometry(pts, 48);
  geo.scale(1, 1, 0.9);
  return geo;
}

function toonRamp() {
  const data = new Uint8Array([55, 120, 185, 235]);
  const tex = new DataTexture(data, data.length, 1, RedFormat);
  tex.minFilter = NearestFilter;
  tex.magFilter = NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

export const RollNeck = forwardRef<Group>(function RollNeck(_, ref) {
  const { geometry, knit, outline, ramp } = useMemo(() => {
    const ramp = toonRamp();
    const knit = new MeshToonMaterial({ color: "#1f1f1f", gradientMap: ramp });
    monochromize(knit, { contrast: 1.1 });
    const outline = new MeshBasicMaterial({ color: new Color("#0a0a0a"), side: BackSide });
    return { geometry: rollNeckGeometry(), knit, outline, ramp };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      knit.dispose();
      outline.dispose();
      ramp.dispose();
    },
    [geometry, knit, outline, ramp],
  );

  return (
    <group ref={ref} position={[NECK.x, 0, NECK.z]} rotation={[0.1, 0, 0]}>
      <mesh geometry={geometry} material={knit} />
      {/* Inverted-hull ink outline */}
      <mesh geometry={geometry} material={outline} scale={1.035} />
    </group>
  );
});
