import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { type Mesh, ShaderMaterial } from "three";
import { damp, stage } from "./stageState";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Aura: spiralling brush-stroke rings, a bright glow right behind the head,
// fading softly into the background (no hard rim).
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uExcite;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float a = atan(p.y, p.x);

    // Spiral: strokes wind inward as they rotate.
    float swirl = a + r * 5.5 - uTime * 0.22;
    float rr = r + 0.012 * sin(swirl * 3.0) + 0.006 * sin(swirl * 7.0 + uTime * 0.3);
    float band = floor(rr * 40.0);
    float stroke = 0.5 + 0.5 * sin(rr * 170.0 + hash(band) * 6.28);
    float brush = 0.6 + 0.4 * sin(swirl * (2.0 + floor(hash(band) * 4.0)) + band * 1.7);
    float rings = mix(0.72, 1.0, stroke * brush);

    float glow = exp(-r * r * 4.5);
    float tone = mix(0.03, 0.88, pow(1.0 - r, 1.6)) * rings + glow * (0.3 + uExcite * 0.2);
    float alpha = smoothstep(1.0, 0.3, r);
    gl_FragColor = vec4(vec3(tone), alpha);
  }
`;

export function Halo() {
  const mesh = useRef<Mesh>(null);
  const camera = useThree((s) => s.camera);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uExcite: { value: 0 } },
      }),
    [],
  );

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(delta, 1 / 30);
    const calm = stage.reducedMotion;
    material.uniforms.uTime.value += dt * (calm ? 0.1 : 1);
    material.uniforms.uExcite.value = stage.excite;

    // Sit behind the head ON the camera ray through the head's centre, so
    // perspective never pulls the aura off-centre (the head may be far from
    // the screen centre on wide layouts). Scale by the same factor so its
    // apparent size stays relative to the head.
    const hs = stage.headSize;
    const depth = hs * 1.8;
    const camZ = camera.position.z;
    const k = (camZ + depth) / camZ;
    m.position.set(stage.head.x * k, stage.head.y * k, -depth);

    const pulse = calm ? 1 : 1 + 0.025 * Math.sin(state.clock.elapsedTime * 1.1);
    m.scale.setScalar(damp(m.scale.x, hs * 1.95 * k * pulse * (1 + stage.excite * 0.06), 6, dt));
    if (!calm) m.rotation.z += dt * 0.05;
  });

  return (
    <mesh ref={mesh} renderOrder={-5}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
