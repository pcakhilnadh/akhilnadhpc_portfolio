import { site, socialLinks } from "../../config/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Logo />
        <ul className="site-footer__links">
          {socialLinks.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="site-footer__meta">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
