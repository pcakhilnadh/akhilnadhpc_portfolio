import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site, socialLinks } from "../config/site";
import { Avatar, SpeechBubble } from "../features/avatar/Avatar";
import { avatar } from "../features/avatar/controller";
import { FRAMING } from "../features/avatar/framing";
import { useLayout } from "../hooks/useBreakpoint";
import { useCoarsePointer, useReducedMotion } from "../hooks/useMediaQuery";

const greetings = [
  "Hey, I'm Akhil. Voice chat is coming soon. For now, drag my head or fling the pages around.",
  "I build vision and language models that run in the real world, from airport queues to passport desks.",
  "Ask me anything soon. I'm learning to talk. Until then, scroll down for the work.",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layout = useLayout();
  const framing = FRAMING[layout];
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const [stageBox, setStageBox] = useState({ w: 1280, h: 800 });
  const [inView, setInView] = useState(true);
  const greetIndex = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    const stageEl = stageRef.current;
    if (!hero || !stageEl) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStageBox({ w: width, h: height });
    });
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.02 });
    ro.observe(stageEl);
    io.observe(hero);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Head position/radius in px from the hero's top-left (the stage starts there
  // in every layout). Used by the poster fallback and the speech bubble.
  const vars = {
    "--hx": `${((framing.x + 1) / 2) * stageBox.w}px`,
    "--hy": `${((1 - framing.y) / 2) * stageBox.h}px`,
    "--hr": `${(framing.size * Math.min(stageBox.w, stageBox.h)) / 2}px`,
  } as CSSProperties;

  const greet = () => {
    avatar.play("Nod");
    avatar.say(greetings[greetIndex.current % greetings.length]);
    greetIndex.current += 1;
  };

  return (
    <section id="top" ref={heroRef} className="hero" data-layout={layout} style={vars} aria-labelledby="hero-title">
      <div ref={stageRef} className="hero__stage">
        <Avatar
          eventSource={heroRef}
          framing={framing}
          active={inView}
          reducedMotion={reducedMotion}
          lowPower={coarse}
        />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="np-tag np-tag--solid">{site.title}</span>
            <span className="np-tag">{site.location}</span>
          </p>
          <h1 id="hero-title" className="hero__name display">
            <span className="hero__first">{site.firstName}</span>
            <span className="hero__last">{site.lastName}</span>
          </h1>
          <p className="hero__lede">
            I design and ship computer-vision and LLM systems, from passport &amp; visa verification to
            passenger-flow analytics, for aviation at scale.
          </p>
          <div className="hero__cta">
            <a href="#work" className="np np-btn np-btn--primary">
              View work <span className="arrow">→</span>
            </a>
            <button type="button" className="np np-btn np-btn--ghost" onClick={greet}>
              <span>
                Say hi<span className="hide-sm"> to my avatar</span>
              </span>
            </button>
          </div>
          <ul className="hero__social" aria-label="Profiles">
            {socialLinks.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="hero__hint" aria-hidden="true">
            {coarse ? "Tap the face · flick the pages" : "Move · drag the head · fling the pages · double-click to shake"}
          </p>
        </div>
      </div>

      <SpeechBubble />

      <a href="#work" className="hero__scroll" aria-label="Scroll to work">
        <span />
      </a>
    </section>
  );
}
