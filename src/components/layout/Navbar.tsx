import { useEffect, useState } from "react";
import { navLinks, site } from "../../config/site";
import { sayHiFromAnywhere } from "../../features/avatar/sayHi";
import { preloadStage } from "../../features/avatar/stageLoader";
import { useAvatarState } from "../../features/avatar/useAvatarState";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToHash } from "../../lib/scrollToHash";
import "./navbar.css";

const sectionIds = navLinks.map((l) => l.href.slice(1));

/** Initials of the last name ("Pullolikkal Chandran" → "PC"), so the logo reads "PC Akhil Nadh". */
const initials = site.lastName
  .split(/\s+/)
  .filter(Boolean)
  .map((w) => w.charAt(0).toUpperCase())
  .join("");

function Logo() {
  return (
    <a
      href="/"
      className="logo"
      aria-label={`${site.fullName}, home`}
      onClick={(e) => {
        // Already home: just return to the top. Never reload, never add a hash.
        e.preventDefault();
        window.scrollTo({ top: 0 });
      }}
    >
      <span className="logo__mark np" aria-hidden="true">
        {initials || site.firstName.charAt(0)}
      </span>
      <span className="logo__word">
        {site.firstName}
        <span>.</span>
      </span>
    </a>
  );
}

/**
 * True while the Home screen is mostly on screen. Home has its own "Say hi"
 * button, so the navbar only offers one once you've scrolled past it.
 */
function useOnHome() {
  const [onHome, setOnHome] = useState(true);
  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) return;
    const io = new IntersectionObserver(([e]) => setOnHome(e.isIntersecting), { threshold: 0.35 });
    io.observe(home);
    return () => io.disconnect();
  }, []);
  return onHome;
}

/** The top bar: logo, section links (Let's talk is one of them), and "Say hi" once you've left Home. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const onHome = useOnHome();
  const { supported, active: avatarOpen } = useAvatarState();
  // The avatar is already open, or this device can't show it: nothing to offer.
  const showSayHi = !onHome && supported && !avatarOpen;

  const sayHi = () => {
    setOpen(false);
    sayHiFromAnywhere();
  };
  // The nav + hamburger only exist once navLinks has entries (see config/site.ts).
  const hasNav = navLinks.length > 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled} data-open={open}>
        <div className="container site-header__bar">
          <Logo />
          {hasNav && (
            <nav className="site-nav" aria-label="Primary">
              <ul>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={active === l.href.slice(1) ? "location" : undefined}
                      onClick={(e) => scrollToHash(e, l.href)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="site-header__actions">
            {supported && (
              // Always rendered so the bar never shifts; hidden (and out of the
              // tab order) while Home's own "Say hi" is on screen.
              <button
                type="button"
                className="np np-btn np-btn--primary np-btn--sm header-cta"
                data-shown={showSayHi}
                aria-hidden={!showSayHi}
                tabIndex={showSayHi ? undefined : -1}
                onClick={sayHi}
                onPointerEnter={preloadStage}
                onFocus={preloadStage}
              >
                Say hi
              </button>
            )}
            {hasNav && (
              <button
                type="button"
                className="menu-btn"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
              >
                <span />
                <span />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Rendered outside <header> so this fixed panel is positioned against the
          viewport, never squashed into the header's box. */}
      {hasNav && (
        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          <nav aria-label="Mobile">
            <ol>
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href.slice(1) ? "location" : undefined}
                    onClick={(e) => scrollToHash(e, l.href, () => setOpen(false))}
                  >
                    <span className="mobile-menu__num">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {showSayHi && (
            <div className="mobile-menu__actions">
              <button type="button" className="np np-btn np-btn--primary" onClick={sayHi} onFocus={preloadStage}>
                Say hi to my avatar <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
