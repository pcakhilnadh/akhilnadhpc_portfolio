import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  CanvasTexture,
  type Camera,
  type Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  DoubleSide,
  Vector3,
} from "three";
import { monochromize } from "./monochrome";
import { clamp, fromControl, stage } from "./stageState";

/** A sheet of "paper": halftone shading, ink border and a few text lines. */
function makePaperTexture() {
  const w = 256;
  const h = 330;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#f4f4f4");
  grad.addColorStop(1, "#b9b9b9");
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
  // Halftone shading toward one corner.
  g.fillStyle = "#6f6f6f";
  for (let y = 0; y < h; y += 7) {
    for (let x = (y / 7) % 2 ? 3.5 : 0; x < w; x += 7) {
      const t = (x / w + y / h) / 2;
      const r = Math.max(0, (t - 0.45) * 5.2);
      if (r > 0.2) {
        g.beginPath();
        g.arc(x, y, r, 0, Math.PI * 2);
        g.fill();
      }
    }
  }
  // "Text" lines.
  g.fillStyle = "#2a2a2a";
  g.fillRect(24, 28, 120, 12);
  g.fillStyle = "#7a7a7a";
  for (let i = 0; i < 9; i++) g.fillRect(24, 62 + i * 22, 208 - (i % 3) * 38, 6);
  g.strokeStyle = "#0a0a0a";
  g.lineWidth = 8;
  g.strokeRect(4, 4, w - 8, h - 8);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Slightly curled sheet so it reads as paper when it spins. */
function makePaperGeometry() {
  const geo = new PlaneGeometry(1, 1.29, 8, 8);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, Math.sin((x + 0.5) * Math.PI) * 0.06 + y * x * 0.08);
  }
  geo.computeVertexNormals();
  return geo;
}

interface PaperBody {
  angle: number;
  radius: number;
  speed: number;
  depth: number;
  scale: number;
  phase: number;
  pos: Vector3;
  vel: Vector3;
  rot: Vector3;
  spin: Vector3;
  angVel: Vector3;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeBodies(count: number): PaperBody[] {
  return Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * Math.PI * 2 + rand(-0.3, 0.3),
    radius: rand(0.55, 1),
    speed: rand(0.03, 0.08) * (Math.random() < 0.5 ? -1 : 1),
    // Behind the figure (in front of the halo), at varied depths for parallax.
    depth: rand(-1.5, -0.35),
    scale: rand(0.7, 1.2),
    phase: rand(0, Math.PI * 2),
    pos: new Vector3(rand(-3, 3), rand(-2, 2), 0),
    vel: new Vector3(),
    rot: new Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)),
    spin: new Vector3(rand(-0.25, 0.25), rand(-0.35, 0.35), rand(-0.2, 0.2)),
    angVel: new Vector3(),
  }));
}

const tmpDir = new Vector3();
const tmpTarget = new Vector3();

/** Project the pointer onto the plane z = `z` in world space. */
function pointerAt(camera: Camera, z: number, out: Vector3) {
  tmpDir.set(stage.pointer.x, stage.pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
  const t = (z - camera.position.z) / tmpDir.z;
  return out.copy(camera.position).addScaledVector(tmpDir, t);
}

export function Papers({ count }: { count: number }) {
  const camera = useThree((s) => s.camera);
  const { geometry, material } = useMemo(() => {
    const mat = new MeshLambertMaterial({ map: makePaperTexture(), side: DoubleSide });
    monochromize(mat, { halftone: false, contrast: 1.05 });
    return { geometry: makePaperGeometry(), material: mat };
  }, []);
  useEffect(
    () => () => {
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const bodies = useMemo(() => makeBodies(count), [count]);
  const meshes = useRef<(Mesh | null)[]>([]);
  const drag = useRef<{ index: number; id: number; offset: Vector3; moved: number } | null>(null);
  const pointerWorld = useMemo(() => new Vector3(), []);

  useEffect(() => {
    const release = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      const b = bodies[d.index];
      if (d.moved < 0.05 * stage.headSize) {
        b.angVel.y += (Math.random() < 0.5 ? -1 : 1) * 14; // tap = flip
      } else {
        b.angVel.set(rand(-6, 6), rand(-6, 6), rand(-4, 4)); // fling = tumble
        stage.excite = Math.max(stage.excite, 0.8);
      }
      drag.current = null;
      document.documentElement.classList.remove("is-grabbing");
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [bodies]);

  const onDown = (index: number) => (e: ThreeEvent<PointerEvent>) => {
    if (fromControl(e.nativeEvent) || drag.current) return;
    e.stopPropagation();
    const b = bodies[index];
    pointerAt(camera, b.pos.z, pointerWorld);
    drag.current = {
      index,
      id: e.nativeEvent.pointerId,
      offset: b.pos.clone().sub(pointerWorld),
      moved: 0,
    };
    document.documentElement.classList.add("is-grabbing");
  };

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const time = state.clock.elapsedTime;
    const hs = stage.headSize;
    const vw = stage.view.x;
    const vh = stage.view.y;
    const calm = stage.reducedMotion ? 0.15 : 1;

    bodies.forEach((b, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      const z = b.depth * hs;

      if (drag.current?.index === i) {
        pointerAt(camera, b.pos.z, pointerWorld).add(drag.current.offset);
        b.vel.copy(pointerWorld).sub(b.pos).divideScalar(Math.max(dt, 1e-3));
        drag.current.moved += pointerWorld.distanceTo(b.pos);
        b.pos.copy(pointerWorld);
      } else {
        // Orbit "home", spread across the stage around the head.
        const a = b.angle + time * b.speed * calm;
        tmpTarget.set(
          stage.head.x * 0.45 + Math.cos(a) * b.radius * vw * 0.46,
          stage.head.y * 0.4 + Math.sin(a) * b.radius * vh * 0.44 + Math.sin(time * 0.8 + b.phase) * hs * 0.04 * calm,
          z,
        );
        // Keep the home orbit clear of the face.
        const hx = tmpTarget.x - stage.head.x;
        const hy = tmpTarget.y - stage.head.y;
        const hd = Math.hypot(hx, hy);
        const clear = hs * 0.85;
        if (hd < clear) {
          const k = clear / (hd || 1);
          tmpTarget.x = stage.head.x + (hd ? hx * k : clear);
          tmpTarget.y = stage.head.y + hy * k;
        }
        // Spring toward home.
        b.vel.addScaledVector(tmpTarget.sub(b.pos), 1.1 * dt);
        // Scatter away from the pointer.
        pointerAt(camera, b.pos.z, pointerWorld);
        const dx = b.pos.x - pointerWorld.x;
        const dy = b.pos.y - pointerWorld.y;
        const dist = Math.hypot(dx, dy);
        const reach = hs * 0.6;
        if (dist < reach && performance.now() - stage.lastMove < 400) {
          const push = (1 - dist / reach) * hs * 9 * dt;
          b.vel.x += (dx / (dist || 1)) * push;
          b.vel.y += (dy / (dist || 1)) * push;
          b.angVel.z += (dx > 0 ? -1 : 1) * push * 2;
        }
        b.vel.multiplyScalar(Math.exp(-1.4 * dt));
        b.pos.addScaledVector(b.vel, dt);
      }

      b.angVel.multiplyScalar(Math.exp(-1.2 * dt));
      b.rot.x += (b.spin.x * calm + b.angVel.x) * dt;
      b.rot.y += (b.spin.y * calm + b.angVel.y) * dt;
      b.rot.z += (b.spin.z * calm + b.angVel.z) * dt;

      mesh.position.copy(b.pos);
      mesh.rotation.set(b.rot.x, b.rot.y, b.rot.z);
      mesh.scale.setScalar(clamp(hs * 0.23 * b.scale, 0.05, 10));
    });
  });

  return (
    <group>
      {bodies.map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            meshes.current[i] = m;
          }}
          geometry={geometry}
          material={material}
          onPointerDown={onDown(i)}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.documentElement.classList.add("is-grab");
          }}
          onPointerOut={() => document.documentElement.classList.remove("is-grab")}
        />
      ))}
    </group>
  );
}
