import type { Project } from "../../data/types";
import { period } from "../../lib/dates";
import { kindOf, stackOf } from "./meta";

const STACK_SHOWN = 5;

/** A compact, equal-height card; the full case study opens in the dialog. */
export function ProjectCard({ project: p, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const stack = stackOf(p);
  const extra = stack.length - STACK_SHOWN;
  const where = kindOf(p) === "personal" ? "Personal" : (p.company ?? "Professional");
  const when = p.startDate ? period(p.startDate, p.endDate) : undefined;

  return (
    <article id={`project-${p.slug}`} className="pcard np card">
      <header className="pcard__top">
        <span className="pcard__index">{String(index).padStart(2, "0")}</span>
        <span className="pcard__where">{where}</span>
        <span className="np-tag pcard__status">{p.status}</span>
      </header>

      <h3 className="pcard__title">
        <button type="button" onClick={onOpen}>
          {p.title}
        </button>
      </h3>
      {when && <p className="pcard__when">{when}</p>}
      <p className="pcard__desc">{p.shortDescription}</p>

      {p.highlights && p.highlights.length > 0 && (
        <ul className="pcard__stats" aria-label="Highlights">
          {p.highlights.slice(0, 2).map((h) => (
            <li key={h.label}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
      )}

      {stack.length > 0 && (
        <ul className="pcard__stack" aria-label="Built with">
          {stack.slice(0, STACK_SHOWN).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {extra > 0 && <li className="pcard__more">+{extra}</li>}
        </ul>
      )}

      <footer className="pcard__foot">
        <button type="button" className="np np-btn np-btn--ghost np-btn--sm" onClick={onOpen} aria-label={`Case study: ${p.title}`}>
          Case study <span className="arrow" aria-hidden="true">→</span>
        </button>
        {(p.liveUrl || p.repoUrl) && (
          <span className="pcard__links">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                Live ↗
              </a>
            )}
            {p.repoUrl && (
              <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                GitHub ↗
              </a>
            )}
          </span>
        )}
      </footer>
    </article>
  );
}
