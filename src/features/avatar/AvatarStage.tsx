import { Suspense, useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import { Backdrop } from "./scene/Backdrop";
import { Halo } from "./scene/Halo";
import { Head } from "./scene/Head";
import { Papers } from "./scene/Papers";
import { stage } from "./scene/stageState";
import type { Framing } from "./framing";

interface Props {
  /** Element that receives pointer events (the whole hero, so overlays don't block). */
  eventSource: RefObject<HTMLElement | null>;
  framing: Framing;
  active: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
  onReady: () => void;
}

/** Converts the breakpoint framing into world-space head position and size every frame. */
function FramingRig({ framing }: { framing: Framing }) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);
  useFrame(() => {
    const dist = camera.position.z;
    const visH = 2 * dist * Math.tan((camera.fov * Math.PI) / 360);
    const visW = visH * (size.width / size.height);
    stage.view.set(visW, visH);
    stage.headSize = framing.size * Math.min(visW, visH);
    stage.head.set((framing.x * visW) / 2, (framing.y * visH) / 2, 0);
    stage.headNdc.set(framing.x, framing.y);
  });
  return null;
}

export default function AvatarStage({ eventSource, framing, active, reducedMotion, lowPower, onReady }: Props) {
  stage.reducedMotion = reducedMotion;

  // Track the pointer anywhere on the page, in the canvas's NDC (so the
  // avatar keeps watching the cursor even over the copy below/beside it).
  const canvasEl = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = canvasEl.current ?? eventSource.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      stage.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
      stage.lastMove = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
    };
  }, [eventSource]);

  return (
    <Canvas
      className="stage-canvas"
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      frameloop={active ? "always" : "never"}
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      flat
      camera={{ fov: 30, position: [0, 0, 10], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      aria-hidden="true"
      onCreated={({ gl }) => {
        canvasEl.current = gl.domElement;
      }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <FramingRig framing={framing} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[-3, 4, 6]} intensity={2.4} />
      <directionalLight position={[4, 2, -5]} intensity={1.6} />
      <Backdrop />
      <Halo />
      <Papers key={framing.papers} count={framing.papers} />
      <Suspense fallback={null}>
        <Head onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
