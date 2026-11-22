import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import {
  AnimationMixer,
  Box3,
  type Group,
  LoopOnce,
  type Mesh,
  type Object3D,
  Vector3,
  type AnimationAction,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { avatar, type AvatarClip } from "../controller";
import { MODEL_URL } from "../model";
import { RollNeck } from "./RollNeck";
import { monochromize } from "./monochrome";
import { clamp, damp, fromControl, stage } from "./stageState";

const configureLoader = (loader: GLTFLoader) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
};

interface DragState {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  moved: number;
}

export function Head({ onReady }: { onReady?: () => void }) {
  const gltf = useLoader(GLTFLoader, MODEL_URL, configureLoader);
  const placer = useRef<Group>(null);
  const tilt = useRef<Group>(null);
  const neck = useRef<Group>(null);

  // One-time model prep: monochrome materials, centring, node lookup, mixer.
  const rig = useMemo(() => {
    const scene = gltf.scene;
    scene.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => monochromize(m, { halftone: !m.name.startsWith("Eye") }));
    });

    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y);

    const find = (name: string) => scene.getObjectByName(name) as Object3D;
    const eyes = [find("Eye_L"), find("Eye_R")].filter(Boolean);

    // The head turns on the neck (just above the chin), not around its middle.
    const skull = new Box3().setFromObject(find("HeadMesh") ?? scene);
    const skullCenter = skull.getCenter(new Vector3());
    const pivot = new Vector3(skullCenter.x, skull.min.y + 0.02, skullCenter.z);

    const mixer = new AnimationMixer(scene);
    const actions = new Map<AvatarClip, AnimationAction>();
    for (const clip of gltf.animations) {
      const action = mixer.clipAction(clip);
      action.setLoop(LoopOnce, 1);
      action.clampWhenFinished = false;
      actions.set(clip.name as AvatarClip, action);
    }
    return { scene, center, maxDim, pivot, eyes, mixer, actions };
  }, [gltf]);

  const motion = useRef({
    dragYaw: 0,
    dragPitch: 0,
    eyeYaw: 0,
    eyePitch: 0,
    hovered: false,
    lookAround: false,
    nextBlink: 1.5,
    nextIdle: 0,
    lastTap: 0,
    drag: null as DragState | null,
  });

  const play = (clip: AvatarClip) => {
    const action = rig.actions.get(clip);
    if (!action) return;
    action.reset().play();
    if (clip === "LookAround") motion.current.lookAround = true;
    if (clip === "Nod" || clip === "Shake") stage.excite = Math.max(stage.excite, 0.6);
  };

  useEffect(() => {
    const onFinished = (e: { action: AnimationAction }) => {
      if (e.action.getClip().name === "LookAround") motion.current.lookAround = false;
    };
    rig.mixer.addEventListener("finished", onFinished);
    const unsubscribe = avatar.subscribe((event) => {
      if (event.type === "play") play(event.clip);
    });
    onReady?.();
    return () => {
      rig.mixer.removeEventListener("finished", onFinished);
      unsubscribe();
      rig.mixer.stopAllAction();
    };
  }, [rig]);

  // Drag to turn the head; a short press without movement is a tap.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = motion.current.drag;
      if (!d || e.pointerId !== d.id) return;
      const dx = e.clientX - d.lastX;
      const dy = e.clientY - d.lastY;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.moved = Math.max(d.moved, Math.hypot(e.clientX - d.startX, e.clientY - d.startY));
      motion.current.dragYaw = clamp(motion.current.dragYaw + dx * 0.008, -1.3, 1.3);
      motion.current.dragPitch = clamp(motion.current.dragPitch + dy * 0.006, -0.6, 0.6);
    };
    const onUp = (e: PointerEvent) => {
      const m = motion.current;
      const d = m.drag;
      if (!d || e.pointerId !== d.id) return;
      m.drag = null;
      document.documentElement.classList.remove("is-grabbing");
      if (e.type === "pointerup" && d.moved < 6) {
        const now = performance.now();
        if (now - m.lastTap < 320) {
          play("Shake");
          m.lastTap = 0;
        } else {
          play("Nod");
          play("Blink");
          m.lastTap = now;
        }
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [rig]);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (fromControl(e.nativeEvent)) return;
    e.stopPropagation();
    const { clientX: x, clientY: y, pointerId: id } = e.nativeEvent;
    motion.current.drag = { id, startX: x, startY: y, lastX: x, lastY: y, moved: 0 };
    document.documentElement.classList.add("is-grabbing");
  };

  useFrame((state, delta) => {
    const p = placer.current;
    const t = tilt.current;
    if (!p || !t) return;
    const dt = Math.min(delta, 1 / 30);
    const m = motion.current;
    const time = state.clock.elapsedTime;
    const now = performance.now();

    // Placement from the responsive framing.
    // Placement from the responsive framing: the head's centre lands on stage.head,
    // the roll-neck hangs just below it.
    const targetScale = stage.headSize / rig.maxDim;
    const s = damp(p.scale.x, targetScale, 6, dt);
    p.scale.setScalar(s);
    p.position.set(
      damp(p.position.x, stage.head.x - rig.center.x * s, 6, dt),
      damp(p.position.y, stage.head.y - rig.center.y * s, 6, dt),
      -rig.center.z * s,
    );

    // Where to look: the pointer, or a lazy wander when idle.
    const idle = now - stage.lastMove > 5000;
    let lookX = stage.pointer.x - stage.headNdc.x;
    let lookY = stage.pointer.y - stage.headNdc.y;
    if (idle || stage.reducedMotion) {
      lookX = Math.sin(time * 0.35) * 0.35;
      lookY = Math.sin(time * 0.23) * 0.15;
    }

    if (!m.drag) {
      m.dragYaw = damp(m.dragYaw, 0, 2.5, dt);
      m.dragPitch = damp(m.dragPitch, 0, 2.5, dt);
    }
    const yaw = clamp(lookX * 0.55, -0.6, 0.6) + m.dragYaw;
    const pitch = clamp(-lookY * 0.4, -0.3, 0.3) + m.dragPitch;
    t.rotation.y = damp(t.rotation.y, yaw, m.drag ? 14 : 4, dt);
    t.rotation.x = damp(t.rotation.x, pitch, m.drag ? 14 : 4, dt);
    t.rotation.z = damp(t.rotation.z, -yaw * 0.08, 4, dt);

    // Breathing: a gentle rise that carries the head with it.
    const breath = stage.reducedMotion ? 0 : Math.sin(time * 1.1);
    t.position.set(rig.pivot.x, rig.pivot.y + breath * 0.0025, rig.pivot.z);
    const n = neck.current;
    if (n) {
      // The collar follows part of the head's turn so the two read as one piece.
      n.rotation.y = damp(n.rotation.y, t.rotation.y * 0.45, 4, dt);
      n.rotation.z = damp(n.rotation.z, -t.rotation.y * 0.04, 4, dt);
      n.position.y = breath * 0.0025;
    }

    // Autonomous life: blinks and the occasional idle look-around.
    m.nextBlink -= dt;
    if (m.nextBlink <= 0) {
      play("Blink");
      m.nextBlink = 2.2 + Math.random() * 4;
    }
    if (idle && !stage.reducedMotion && now > m.nextIdle) {
      play("LookAround");
      m.nextIdle = now + 9000 + Math.random() * 6000;
    }

    rig.mixer.update(dt);

    // Eyes lead the head (applied after the mixer so clips win when active).
    if (!m.lookAround) {
      m.eyeYaw = damp(m.eyeYaw, clamp(lookX * 0.9 - t.rotation.y * 0.6, -0.35, 0.35), 10, dt);
      m.eyePitch = damp(m.eyePitch, clamp(-lookY * 0.6 - t.rotation.x * 0.4, -0.25, 0.25), 10, dt);
      for (const eye of rig.eyes) eye.rotation.set(m.eyePitch, m.eyeYaw, 0);
    }

    stage.excite = damp(stage.excite, 0, 1.6, dt);
  });

  return (
    <group ref={placer}>
      <group
        ref={tilt}
        onPointerDown={onPointerDown}
        onPointerOver={(e) => {
          e.stopPropagation();
          motion.current.hovered = true;
          document.documentElement.classList.add("is-grab");
        }}
        onPointerOut={() => {
          motion.current.hovered = false;
          document.documentElement.classList.remove("is-grab");
        }}
      >
        <primitive object={rig.scene} position={[-rig.pivot.x, -rig.pivot.y, -rig.pivot.z]} />
      </group>
      <RollNeck ref={neck} />
    </group>
  );
}
