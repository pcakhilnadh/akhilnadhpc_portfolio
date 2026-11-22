import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";
import { stage } from "./stageState";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

// Radiating speed lines + pixel stars, centred on the avatar's head.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uExcite;
  uniform vec2 uCenter;
  uniform vec2 uRes;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  void main() {
    vec2 p = vUv - uCenter;
    p.x *= uRes.x / uRes.y;
    float r = length(p);
    float a = atan(p.y, p.x) / 6.2831853 + 0.5;

    float rays = 0.0;
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float n = 120.0 + fi * 150.0;
      float id = floor(a * n);
      float f = fract(a * n);
      float h = hash(id + fi * 31.7);
      if (h < 0.5) continue;
      float w = 0.08 + 0.3 * hash(id + 7.0);
      float line = 1.0 - smoothstep(0.0, w, abs(f - 0.5) * 2.0);
      float speed = (0.08 + 0.25 * h) * (1.0 + uExcite * 3.0);
      float seg = fract(r * (0.6 + h * 1.4) - uTime * speed + h * 13.0);
      float streak = smoothstep(0.0, 0.25, seg) * smoothstep(1.0, 0.55, seg);
      rays += line * streak * (0.25 + 0.75 * hash(id + 3.0)) * (0.6 - fi * 0.15);
    }
    rays *= smoothstep(0.12, 0.75, r) * (0.55 + uExcite * 0.35);

    vec2 cell = floor(gl_FragCoord.xy / 3.0);
    float s = hash2(cell);
    float star = step(0.9965, s) * (0.45 + 0.55 * sin(uTime * (1.0 + s * 4.0) + s * 60.0));
    float bigStar = step(0.99965, hash2(cell * 0.37 + 4.0));

    float lum = 0.035 + rays * 0.5 + max(star, 0.0) * 0.8 + bigStar * 0.6;
    lum *= 1.0 - smoothstep(0.6, 1.4, r) * 0.35;
    gl_FragColor = vec4(vec3(lum), 1.0);
  }
`;

export function Backdrop() {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uExcite: { value: 0 },
          uCenter: { value: new Vector2(0.5, 0.5) },
          uRes: { value: new Vector2(1, 1) },
        },
      }),
    [],
  );

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime.value += Math.min(delta, 1 / 30) * (stage.reducedMotion ? 0.08 : 1);
    u.uExcite.value = stage.excite;
    // Lines radiate from the head, nudged by the pointer for parallax.
    u.uCenter.value.set(
      (stage.headNdc.x + 1) / 2 - stage.pointer.x * 0.015,
      (stage.headNdc.y + 1) / 2 - stage.pointer.y * 0.015,
    );
    u.uRes.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
