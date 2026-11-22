import { Section } from "../../components/ui/Section";
import { certifications } from "../../data/certifications";
import { monthYear } from "../../lib/dates";
import "./certificates.css";

/** Certificates from certifications.json, latest first. */
export function Certificates() {
  const sorted = [...certifications].sort((a, b) => (a.issued < b.issued ? 1 : -1));
  return (
    <Section id="certificates" index="05" eyebrow="Certificates" title="Certificates" outline="Always learning">
      <ul className="certs">
        {sorted.map((c) => (
          <li key={`${c.name}-${c.issued}`} className="cert np card">
            <p className="cert__top">
              <span className="np-tag np-tag--solid">{c.issuer}</span>
              <time dateTime={c.issued}>{monthYear(c.issued)}</time>
            </p>
            <h3 className="cert__name">{c.name}</h3>
            {c.skills && c.skills.length > 0 && (
              <ul className="tag-list" aria-label="Skills">
                {c.skills.map((s) => (
                  <li key={s} className="np-tag">
                    {s}
                  </li>
                ))}
              </ul>
            )}
            {c.url && (
              <a className="cert__link" href={c.url} target="_blank" rel="noopener noreferrer">
                View certificate <span aria-hidden="true">↗</span>
                <span className="visually-hidden">: {c.name}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
