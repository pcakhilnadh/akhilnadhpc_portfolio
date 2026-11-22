import { Section } from "../../components/ui/Section";
import { Timeline, type TimelineItem } from "../../components/ui/Timeline";
import { experience } from "../../data/experience";
import { projects } from "../../data/projects";
import { formatMonths, monthsBetween, period } from "../../lib/dates";
import { scrollToHash } from "../../lib/scrollToHash";
import "./experience.css";

/** Jobs from experience.json on the shared timeline, latest first, with their projects and references. */
export function Experience() {
  const items: TimelineItem[] = experience.map((job) => {
    const jobProjects = projects.filter((p) => p.company === job.company);
    const refs = job.references ?? [];
    const bullets = job.highlights ?? [];
    return {
      key: `${job.company}-${job.start}`,
      sortDate: job.start,
      period: period(job.start, job.end),
      periodNote: formatMonths(monthsBetween(job.start, job.end)),
      title: job.role,
      org: job.company,
      orgUrl: job.url,
      meta: job.location,
      current: !job.end,
      children:
        jobProjects.length + refs.length + bullets.length > 0 || job.context ? (
          <div className="job">
            {job.context && <p className="job__context">{job.context}</p>}
            {bullets.length > 0 && (
              <ul className="job__bullets">
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {jobProjects.length > 0 && (
              <div className="job__block">
                <p className="kv__label">Projects</p>
                <ul className="job__projects">
                  {jobProjects.map((p) => (
                    <li key={p.slug}>
                      <a
                        href={`#project-${p.slug}`}
                        className="text-link"
                        onClick={(e) => scrollToHash(e, `#project-${p.slug}`)}
                      >
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {refs.length > 0 && (
              <div className="job__block">
                <p className="kv__label">References</p>
                <ul className="job__refs">
                  {refs.map((r) => (
                    <li key={r.name}>
                      {r.linkedin ? (
                        <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">
                          {r.name}
                        </a>
                      ) : (
                        <span>{r.name}</span>
                      )}
                      <span className="job__ref-role">{[r.role, r.relationship].filter(Boolean).join(" · ")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : undefined,
    };
  });

  return (
    <Section id="experience" index="02" eyebrow="Experience" title="Experience" outline="Where I've worked">
      <Timeline items={items} label="Work experience" />
    </Section>
  );
}
