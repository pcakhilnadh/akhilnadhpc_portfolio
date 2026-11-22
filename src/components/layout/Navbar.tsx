import { useEffect, useState } from "react";
import { contactHref, navLinks, site } from "../../config/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { scrollToHash } from "../../lib/scrollToHash";
import "./navbar.css";

const sectionIds = navLinks.map((l) => l.href.slice(1));

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
        {site.firstName.charAt(0)}
      </span>
      <span className="logo__word">
        {site.firstName}
        <span>.</span>
      </span>
    </a>
  );
}

/** The top bar: logo, section links, and the install / contact buttons. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { canInstall, install } = useInstallPrompt();
  const active = useActiveSection(sectionIds);
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
            {canInstall && (
              <button type="button" className="np np-btn np-btn--ghost np-btn--sm install-btn" onClick={install}>
                Install app
              </button>
            )}
            <a
              href={contactHref}
              className="np np-btn np-btn--primary np-btn--sm header-cta"
              onClick={(e) => scrollToHash(e, contactHref, () => setOpen(false))}
            >
              Let&apos;s talk
            </a>
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

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed panel and squash it. */}
      {hasNav && (
        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          <nav aria-label="Mobile">
            <ol>
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => scrollToHash(e, l.href, () => setOpen(false))}>
                    <span className="mobile-menu__num">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mobile-menu__actions">
            {/* The header's "Let's talk" is hidden on the smallest phones; this one always shows. */}
            <a
              href={contactHref}
              className="np np-btn np-btn--primary"
              onClick={(e) => scrollToHash(e, contactHref, () => setOpen(false))}
            >
              Let&apos;s talk <span className="arrow" aria-hidden="true">→</span>
            </a>
            {canInstall && (
              <button type="button" className="np np-btn np-btn--ghost" onClick={install}>
                Install as app
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
