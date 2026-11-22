import { useEffect, useRef, type ReactNode } from "react";
import type { Project } from "../../data/types";
import { period } from "../../lib/dates";
import { kindOf } from "./meta";

/** The full case study in a modal dialog (Esc, the close button or the backdrop close it). */
export function ProjectDialog({ project: p, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
    if (p) d.querySelector(".pdialog__body")?.scrollTo(0, 0);
  }, [p]);

  return (
    <dialog
      ref={ref}
      className="pdialog"
      aria-labelledby="pdialog-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {p && <Body p={p} onClose={onClose} />}
    </dialog>
  );
}

function Body({ p, onClose }: { p: Project; onClose: () => void }) {
  const facts = [
    { k: "Type", v: kindOf(p) === "personal" ? "Personal" : "Professional" },
    { k: "Company", v: p.company },
    { k: "Role", v: p.role },
    { k: "When", v: p.startDate ? period(p.startDate, p.endDate) + (p.duration ? ` · ${p.duration}` : "") : undefined },
    { k: "Team", v: p.teamSize ? `${p.teamSize} people` : undefined },
    { k: "Status", v: p.status },
  ].filter((f) => f.v);

  const stack = [
    { k: "Technologies", v: p.technologies },
    { k: "Frameworks", v: p.frameworks },
    { k: "Libraries", v: p.libraries },
    { k: "Cloud", v: p.cloudServices },
    { k: "Dashboards", v: p.dashboardTools },
  ].filter((s) => s.v && s.v.length > 0);

  const models = (p.models ?? []) as { componentName?: string; modelName?: string; purpose?: string; inferenceLocation?: string }[];

  return (
    <div className="pdialog__panel np">
      <header className="pdialog__head">
        <div>
          {p.domain && p.domain.length > 0 && <p className="pdialog__domain">{p.domain.join(" · ")}</p>}
          <h3 id="pdialog-title" className="pdialog__title">
            {p.title}
          </h3>
        </div>
        <button type="button" className="np np-btn np-btn--ghost np-btn--sm pdialog__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </header>

      <div className="pdialog__body">
        <p className="pdialog__lead">{p.shortDescription}</p>

        <dl className="pdialog__facts">
          {facts.map((f) => (
            <div key={f.k} className="kv">
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>

        {(p.liveUrl || p.repoUrl) && (
          <p className="pdialog__links">
            {p.liveUrl && (
              <a className="np np-btn np-btn--primary np-btn--sm" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                Live site <span className="arrow" aria-hidden="true">↗</span>
              </a>
            )}
            {p.repoUrl && (
              <a className="np np-btn np-btn--ghost np-btn--sm" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                Source on GitHub <span className="arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </p>
        )}

        {p.highlights && p.highlights.length > 0 && (
          <ul className="pdialog__stats" aria-label="Highlights">
            {p.highlights.map((h) => (
              <li key={h.label}>
                <b>{h.value}</b>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
        )}

        {p.longDescription && (
          <Block title="Overview">
            <p>{p.longDescription}</p>
          </Block>
        )}
        {p.problemStatement && (
          <Block title="Problem">
            <p>{p.problemStatement}</p>
          </Block>
        )}
        {p.architectureOverview && (
          <Block title="Approach">
            <p>{p.architectureOverview}</p>
          </Block>
        )}
        {p.workflowSteps && p.workflowSteps.length > 0 && (
          <Block title="How it works">
            <ol className="pdialog__steps">
              {p.workflowSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </Block>
        )}
        {models.length > 0 && (
          <Block title="Models">
            <ul className="pdialog__models">
              {models.map((m) => (
                <li key={`${m.componentName}-${m.modelName}`}>
                  <strong>{m.modelName}</strong>
                  <span>
                    {m.componentName}
                    {m.inferenceLocation && ` · ${m.inferenceLocation}`}
                  </span>
                  {m.purpose && <span className="pdialog__muted">{m.purpose}</span>}
                </li>
              ))}
            </ul>
          </Block>
        )}
        {p.businessImpact && p.businessImpact.length > 0 && (
          <Block title="Impact">
            <ul className="pdialog__impact">
              {p.businessImpact.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Block>
        )}
        {stack.length > 0 && (
          <Block title="Stack">
            <dl className="pdialog__stack">
              {stack.map((s) => (
                <div key={s.k} className="kv">
                  <dt>{s.k}</dt>
                  <dd>{s.v!.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pdialog__block">
      <h4 className="kv__label">{title}</h4>
      {children}
    </section>
  );
}
