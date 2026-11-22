import { site } from "../../config/site";
import "./footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          <span className="site-footer__year">© {new Date().getFullYear()} </span>
          {site.fullName}
        </p>
        <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
