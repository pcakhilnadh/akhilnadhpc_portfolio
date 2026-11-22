import { useEffect, useState } from "react";
import { navLinks, site } from "../../config/site";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${site.fullName}, home`}>
      <span className="logo__mark np" aria-hidden="true">
        A
      </span>
      <span className="logo__word">
        Akhil Nadh<span>.</span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { canInstall, install } = useInstallPrompt();

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
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-header__actions">
            {canInstall && (
              <button type="button" className="np np-btn np-btn--ghost np-btn--sm install-btn" onClick={install}>
                Install app
              </button>
            )}
            <a href="#contact" className="np np-btn np-btn--primary np-btn--sm header-cta">
              Let&apos;s talk
            </a>
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
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed panel and squash it. */}
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ol>
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        {canInstall && (
          <button type="button" className="np np-btn np-btn--primary" onClick={install}>
            Install as app
          </button>
        )}
      </div>
    </>
  );
}
