import type { ReactNode } from "react";
import { Section } from "../../components/ui/Section";
import { projects } from "../../data/projects";
import type { Project } from "../../data/types";
import { period } from "../../lib/dates";
import "./projects.css";

/** Case studies from projects.json, in the order they appear in the file. */
export function Projects() {
  return (
    <Section id="projects" index="03" eyebrow="Projects" title="Projects" outline="Selected work">
      <div className="projects">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i + 1} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const facts = [
    { k: "Role", v: p.role },
    { k: "Company", v: p.company },
    { k: "When", v: p.startDate ? period(p.startDate, p.endDate) + (p.duration ? ` · ${p.duration}` : "") : undefined },
    { k: "Team", v: p.teamSize ? `${p.teamSize} people` : undefined },
  ].filter((f) => f.v);

  const stack = [
    { k: "Frameworks", v: p.frameworks },
    { k: "Technologies", v: p.technologies },
    { k: "Libraries", v: p.libraries },
    { k: "Cloud", v: p.cloudServices },
    { k: "Dashboards", v: p.dashboardTools },
  ].filter((s) => s.v && s.v.length > 0);

  const models = (p.models ?? []) as { componentName?: string; modelName?: string; purpose?: string; inferenceLocation?: string }[];

  return (
    <article id={`project-${p.slug}`} className="project np card">
      <header className="project__head">
        <p className="project__kicker">
          <span className="np-tag np-tag--solid">{String(index).padStart(2, "0")}</span>
          <span className="np-tag">{p.status}</span>
          {p.industry?.[0] && <span className="np-tag">{p.industry[0]}</span>}
        </p>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__desc">{p.shortDescription}</p>
      </header>

      {facts.length > 0 && (
        <dl className="project__facts">
          {facts.map((f) => (
            <div key={f.k} className="kv">
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.highlights && p.highlights.length > 0 && (
        <ul className="project__stats" aria-label="Highlights">
          {p.highlights.map((h) => (
            <li key={h.label} className="project__stat">
              <span className="project__stat-value">{h.value}</span>
              <span className="project__stat-label">{h.label}</span>
            </li>
          ))}
        </ul>
      )}

      {p.tags && (
        <ul className="tag-list" aria-label="Tags">
          {p.tags.map((t) => (
            <li key={t} className="np-tag">
              {t}
            </li>
          ))}
        </ul>
      )}

      <details className="project__more">
        <summary className="np np-btn np-btn--ghost np-btn--sm">
          Case study <span className="arrow" aria-hidden="true">↓</span>
        </summary>
        <div className="project__case">
          {p.longDescription && (
            <CaseBlock title="Overview">
              <p>{p.longDescription}</p>
            </CaseBlock>
          )}
          {p.problemStatement && (
            <CaseBlock title="Problem">
              <p>{p.problemStatement}</p>
            </CaseBlock>
          )}
          {p.architectureOverview && (
            <CaseBlock title="Approach">
              <p>{p.architectureOverview}</p>
            </CaseBlock>
          )}
          {p.workflowSteps && p.workflowSteps.length > 0 && (
            <CaseBlock title="Pipeline">
              <ol className="project__steps">
                {p.workflowSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </CaseBlock>
          )}
          {models.length > 0 && (
            <CaseBlock title="Models">
              <ul className="project__models">
                {models.map((m) => (
                  <li key={`${m.componentName}-${m.modelName}`}>
                    <strong>{m.modelName}</strong>
                    <span>
                      {m.componentName}
                      {m.inferenceLocation && ` · ${m.inferenceLocation}`}
                    </span>
                    {m.purpose && <span className="project__model-purpose">{m.purpose}</span>}
                  </li>
                ))}
              </ul>
            </CaseBlock>
          )}
          {p.businessImpact && p.businessImpact.length > 0 && (
            <CaseBlock title="Impact">
              <ul className="project__impact">
                {p.businessImpact.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </CaseBlock>
          )}
          {stack.length > 0 && (
            <CaseBlock title="Stack">
              <dl className="project__stack">
                {stack.map((s) => (
                  <div key={s.k} className="kv">
                    <dt>{s.k}</dt>
                    <dd>{s.v!.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </CaseBlock>
          )}
        </div>
      </details>
    </article>
  );
}

function CaseBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="case-block">
      <h4 className="kv__label">{title}</h4>
      {children}
    </section>
  );
}
