import { useMemo, useState } from "react";
import { Section } from "../../components/ui/Section";
import { buildResume } from "./model";
import "./resume.css";

type Status = "idle" | "building" | "error";

/** One line of the contact header: items separated by bars, links clickable. */
function ContactRow({ items }: { items: { text: string; href?: string }[] }) {
  if (!items.length) return null;
  return (
    <p className="paper__links">
      {items.map((l) => (
        <span key={l.text}>{l.href ? <a href={l.href}>{l.text}</a> : l.text}</span>
      ))}
    </p>
  );
}

/**
 * Resume: last-updated date, a download button that builds the ATS-friendly
 * PDF on the spot, and the full resume shown as a sheet of paper.
 */
export function Resume() {
  const r = useMemo(buildResume, []);
  const [status, setStatus] = useState<Status>("idle");

  async function download() {
    setStatus("building");
    try {
      const { downloadResume } = await import("./pdf");
      downloadResume();
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <Section id="resume" index="06" eyebrow="Resume" title="Resume">
      <div className="resume__bar">
        <p className="resume__updated">
          Last updated <time dateTime={r.updatedIso}>{r.updated}</time>
        </p>
        <button
          type="button"
          className="np np-btn np-btn--primary resume__download"
          onClick={download}
          disabled={status === "building"}
          aria-describedby="resume-status"
        >
          {status === "building" ? "Building PDF…" : "Download PDF"}
          <span className="arrow" aria-hidden="true">
            ↓
          </span>
        </button>
      </div>
      <p id="resume-status" className="resume__status" role="status">
        {status === "error" ? "Could not build the PDF. Please try again." : ""}
      </p>

      <article className="paper np" aria-label={`${r.name} resume`}>
        <div className="paper__sheet">
          <header>
            <p className="paper__name">{r.name}</p>
            <p className="paper__headline">{r.headline}</p>
            <ContactRow items={[r.links[0], { text: r.location }]} />
            <ContactRow items={r.links.slice(1)} />
          </header>
          <hr />

          <h3 className="paper__h">Summary</h3>
          <p>{r.summary}</p>

          {r.experience.length > 0 && (
            <>
              <h3 className="paper__h">Experience{r.totalYears ? ` (${r.totalYears} years)` : ""}</h3>
              {r.experience.map((j) => (
                <div key={j.company + j.period} className="paper__item">
                  <p className="paper__row">
                    <b>{j.role}</b>
                    <span>{j.period}</span>
                  </p>
                  <p className="paper__soft">{[j.company, j.location].filter(Boolean).join(", ")}</p>
                  {j.context && <p className="paper__context">{j.context}</p>}
                  {j.bullets.length > 0 && (
                    <ul>
                      {j.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}

          {r.projects.length > 0 && (
            <>
              <h3 className="paper__h">Projects</h3>
              {r.projects.map((p) => (
                <div key={p.title} className="paper__item">
                  <p>
                    <b>{p.title}</b>
                  </p>
                  <p>{p.text}</p>
                </div>
              ))}
            </>
          )}

          {r.skills.length > 0 && (
            <>
              <h3 className="paper__h">Skills</h3>
              {r.skills.map((g) => (
                <p key={g.group} className="paper__skill">
                  <b>{g.group}:</b> {g.items.join(", ")}
                </p>
              ))}
            </>
          )}

          {r.education.length > 0 && (
            <>
              <h3 className="paper__h">Education</h3>
              {r.education.map((e) => (
                <div key={e.degree + e.period} className="paper__item">
                  <p className="paper__row">
                    <b>{e.degree}</b>
                    <span>{e.period}</span>
                  </p>
                  <p className="paper__soft">{e.institution}</p>
                </div>
              ))}
            </>
          )}

          {r.achievements.length > 0 && (
            <>
              <h3 className="paper__h">Key Achievements</h3>
              <ul>
                {r.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </article>
    </Section>
  );
}
