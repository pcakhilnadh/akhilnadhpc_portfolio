import type { Material } from "three";

const HALFTONE = /* glsl */ `
  vec2 hp = mat2(0.7071, -0.7071, 0.7071, 0.7071) * gl_FragCoord.xy / 4.5;
  float dotR = sqrt(clamp(1.0 - ink, 0.0, 1.0)) * 0.62;
  float dotMask = 1.0 - smoothstep(dotR - 0.12, dotR, length(fract(hp) - 0.5));
  float mid = smoothstep(0.08, 0.35, ink) * smoothstep(0.95, 0.6, ink);
  ink = mix(ink, ink * 0.55, dotMask * mid * 0.55);
`;

/**
 * Patches a built-in three.js material so it renders as monochrome ink:
 * luminance only, a gentle contrast curve, and screen-space halftone dots
 * in the mid-tones, matching the comic look of the reference artwork.
 */
export function monochromize(material: Material, opts: { halftone?: boolean; contrast?: number } = {}) {
  const halftone = opts.halftone ?? true;
  const contrast = (opts.contrast ?? 1.12).toFixed(3);
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      [
        "#include <dithering_fragment>",
        "float ink = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));",
        `ink = clamp((ink - 0.5) * ${contrast} + 0.5, 0.0, 1.0);`,
        halftone ? HALFTONE : "",
        "gl_FragColor.rgb = vec3(ink);",
      ].join("\n"),
    );
  };
  material.customProgramCacheKey = () => `mono-${halftone}-${contrast}`;
  material.needsUpdate = true;
}
