import { site } from "../../config/site";
import { openConsent } from "../../lib/consent";
import "./footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          <span className="site-footer__year">© {new Date().getFullYear()} </span>
          {site.fullName}
        </p>
        <div className="site-footer__links">
          <button type="button" onClick={openConsent}>
            Cookies
          </button>
          <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
