import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Avatar } from "../features/avatar/Avatar";
import { AvatarChat } from "../features/avatar/chat/AvatarChat";
import { FRAMING } from "../features/avatar/framing";
import { PersonalInfo } from "../features/profile/PersonalInfo";
import { useLayout } from "../hooks/useBreakpoint";
import { useCoarsePointer, useReducedMotion } from "../hooks/useMediaQuery";
import "./home.css";

/**
 * Home: the inner app, everything between the Navbar and the Footer.
 *
 * It only arranges the parts and measures the space they share:
 *   - <Avatar />       the 2D portrait / 3D avatar area  (left, or top on phones)
 *   - <AvatarChat />   the "Say hi" button and the avatar's message
 *   - <PersonalInfo /> name, role and bio                (right, or below on phones)
 *
 * Each part owns its own behaviour and styles; swap or extend any of them
 * without touching the others.
 */
export function Home() {
  const homeRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layout = useLayout();
  const framing = FRAMING[layout];
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const [stageBox, setStageBox] = useState({ w: 1280, h: 800 });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const home = homeRef.current;
    const stageEl = stageRef.current;
    if (!home || !stageEl) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStageBox({ w: width, h: height });
    });
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.02 });
    ro.observe(stageEl);
    io.observe(home);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Where the avatar's head is, in px from the page's top-left (the stage starts
  // there in every layout). Shared by Avatar2D and the chat message so they line
  // up exactly with the 3D head.
  const vars = {
    "--hx": `${((framing.x + 1) / 2) * stageBox.w}px`,
    "--hy": `${((1 - framing.y) / 2) * stageBox.h}px`,
    "--hr": `${(framing.size * Math.min(stageBox.w, stageBox.h)) / 2}px`,
  } as CSSProperties;

  return (
    <section ref={homeRef} className="home" data-layout={layout} style={vars} aria-labelledby="profile-title">
      <div ref={stageRef} className="home__stage">
        <Avatar
          eventSource={homeRef}
          framing={framing}
          running={inView}
          reducedMotion={reducedMotion}
          lowPower={coarse}
        />
        <AvatarChat />
      </div>

      <div className="container home__info">
        <PersonalInfo />
      </div>
    </section>
  );
}
