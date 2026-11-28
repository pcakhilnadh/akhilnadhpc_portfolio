import { useEffect, useMemo, useState } from "react";
import { Section } from "../../components/ui/Section";
import { projects } from "../../data/projects";
import type { Project } from "../../data/types";
import { track } from "../../lib/analytics";
import { ProjectCard } from "./ProjectCard";
import { ProjectDialog } from "./ProjectDialog";
import { PROJECT_AREAS } from "./areas";
import { haystack, inArea, kindOf, OPEN_PROJECT_EVENT, recency, type Kind } from "./meta";
import "./projects.css";

type KindFilter = "all" | Kind;
type Sort = "latest" | "oldest";

const KINDS: { id: KindFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "professional", label: "Professional" },
  { id: "personal", label: "Personal" },
];


/**
 * Projects from projects.json: search, filter by kind and skill, sort by
 * date, and open a case study in a dialog.
 */
export function Projects() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [area, setArea] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("latest");
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    if (open) track("project_open");
  }, [open]);

  // Experience links open a project's case study directly.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = projects.find((x) => x.slug === (e as CustomEvent<string>).detail);
      if (p) setOpen(p);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, []);

  const counts = useMemo(
    () => ({
      all: projects.length,
      professional: projects.filter((p) => kindOf(p) === "professional").length,
      personal: projects.filter((p) => kindOf(p) === "personal").length,
    }),
    [],
  );

  // Focus areas that at least one project falls under, with their counts.
  const areas = useMemo(
    () =>
      PROJECT_AREAS.map((a) => ({ ...a, count: projects.filter((p) => inArea(p, a.terms)).length })).filter((a) => a.count > 0),
    [],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const terms = areas.find((a) => a.label === area)?.terms;
    const list = projects.filter(
      (p) =>
        (kind === "all" || kindOf(p) === kind) &&
        (!terms || inArea(p, terms)) &&
        (!q || q.split(/\s+/).every((w) => haystack(p).includes(w))),
    );
    // stable sort, so equal dates keep file order
    return [...list].sort((a, b) => {
      const d = recency(b).localeCompare(recency(a));
      return sort === "latest" ? d : -d;
    });
  }, [query, kind, area, sort, areas]);

  const filtered = query.trim() !== "" || kind !== "all" || area !== null;
  const clear = () => {
    setQuery("");
    setKind("all");
    setArea(null);
  };

  return (
    <Section id="projects" index="03" eyebrow="Projects" title="Projects" outline="Selected work">
      <div className="pf" role="search">
        <div className="pf__row">
          <label className="pf__search">
            <span className="visually-hidden">Search projects</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, tech or company"
              autoComplete="off"
            />
          </label>

          <div className="pf__tabs" role="group" aria-label="Project type">
            {KINDS.map((k) => (
              <button key={k.id} type="button" className="pf__tab" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
                {k.label}
                <span className="pf__count">{counts[k.id]}</span>
              </button>
            ))}
          </div>

          <label className="pf__sort">
            <span className="visually-hidden">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>

        {areas.length > 0 && (
          <div className="pf__skills" role="group" aria-label="Filter by focus area">
            {areas.map((a) => (
              <button
                key={a.label}
                type="button"
                className="pf__skill"
                aria-pressed={area === a.label}
                onClick={() => setArea(area === a.label ? null : a.label)}
              >
                {a.label}
                <span className="pf__count">{a.count}</span>
              </button>
            ))}
          </div>
        )}

        <p className="pf__status" aria-live="polite">
          <span>
            {shown.length} {shown.length === 1 ? "project" : "projects"}
            {area && ` in ${area}`}
          </span>
          {filtered && (
            <button type="button" className="pf__clear" onClick={clear}>
              Clear filters
            </button>
          )}
        </p>
      </div>

      {shown.length > 0 ? (
        <ul className="pgrid">
          {shown.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} index={i + 1} onOpen={() => setOpen(p)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="pgrid__empty">
          <p>No projects match.</p>
          <button type="button" className="np np-btn np-btn--ghost np-btn--sm" onClick={clear}>
            Clear filters
          </button>
        </div>
      )}

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
