import { Component, lazy, Suspense, useEffect, useState, type ReactNode, type RefObject } from "react";
import { avatar } from "./controller";
import type { Framing } from "./framing";
import "./avatar.css";

const AvatarStage = lazy(() => import("./AvatarStage"));

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

class StageBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("Avatar stage failed, showing poster instead.", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Rendered by the hero above its copy, so the bubble is never covered by text. */
export function SpeechBubble() {
  const [line, setLine] = useState<{ text: string; key: number } | null>(null);
  useEffect(() => {
    let timer: number | undefined;
    const unsubscribe = avatar.subscribe((e) => {
      if (e.type === "say") {
        window.clearTimeout(timer);
        setLine({ text: e.text, key: Date.now() });
        timer = window.setTimeout(() => setLine(null), e.durationMs);
      }
      if (e.type === "hush") setLine(null);
    });
    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, []);
  return (
    <div className="bubble-anchor" aria-live="polite">
      {line && (
        <p key={line.key} className="bubble">
          {line.text}
        </p>
      )}
    </div>
  );
}

interface Props {
  eventSource: RefObject<HTMLElement | null>;
  framing: Framing;
  active: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
}

/** The avatar layer of the hero: 3D stage when possible, illustrated poster otherwise. */
export function Avatar(props: Props) {
  const [webgl] = useState(hasWebGL);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const show3d = webgl && !failed;

  return (
    <div className="avatar-layer" data-ready={ready && show3d}>
      <div className="avatar-poster" aria-hidden={show3d && ready}>
        <img
          src="/images/avatar-poster.webp"
          alt="Illustrated portrait of Akhil Nadh in a wide-brimmed hat and turtleneck"
          width={720}
          height={964}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      {show3d && (
        <StageBoundary onError={() => setFailed(true)}>
          <Suspense fallback={null}>
            <AvatarStage {...props} onReady={() => setReady(true)} />
          </Suspense>
        </StageBoundary>
      )}
    </div>
  );
}
