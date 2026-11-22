import { Component, lazy, Suspense, type ReactNode, type RefObject } from "react";
import { avatar } from "./controller";
import type { Framing } from "./framing";
import { loadStage } from "./stageLoader";
import { useAvatarState } from "./useAvatarState";

/** Separate chunk: three.js and the scene are fetched only once the visitor opens the avatar. */
const AvatarStage = lazy(loadStage);

class StageBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("Avatar3D failed, staying on the 2D portrait.", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export interface Avatar3DProps {
  eventSource: RefObject<HTMLElement | null>;
  framing: Framing;
  /** Whether the scene should be rendering frames (false when scrolled out of view). */
  running: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
}

/**
 * Avatar3D: the interactive 3D avatar. Renders nothing until the visitor
 * opens the avatar (`avatar.open()`), then loads the 3D chunk and model;
 * closing (`avatar.close()`) unmounts it and frees the GPU memory. If the
 * scene crashes, it reports `avatar.fail()` and the page keeps the 2D portrait.
 */
export function Avatar3D(props: Avatar3DProps) {
  const { supported, active } = useAvatarState();
  if (!active || !supported) return null;

  return (
    <StageBoundary onError={avatar.fail}>
      <Suspense fallback={null}>
        <AvatarStage {...props} onReady={() => avatar.setReady(true)} />
      </Suspense>
    </StageBoundary>
  );
}
