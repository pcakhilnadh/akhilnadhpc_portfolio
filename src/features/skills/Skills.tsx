import { Section } from "../../components/ui/Section";
import { skillGroups } from "../../data/skills";
import "./skills.css";

const LEVELS = ["", "Familiar", "Working", "Proficient", "Advanced", "Expert"];

/** Skill groups from skills.json; each skill shows its 1–5 rating as five blocks. */
export function Skills() {
  return (
    <Section id="skills" index="04" eyebrow="Skills" title="Skills" outline="The toolbox">
      <p className="skills__legend" aria-hidden="true">
        <Meter rating={1} /> Familiar <span className="skills__legend-sep">→</span> <Meter rating={5} /> Expert
      </p>
      <div className="skills">
        {skillGroups.map((g) => (
          <section key={g.category} className="skill-group np card" aria-labelledby={`skills-${slug(g.category)}`}>
            <header className="skill-group__head">
              <h3 id={`skills-${slug(g.category)}`} className="skill-group__title">
                {g.category}
              </h3>
              <span className="skill-group__count">{String(g.skills.length).padStart(2, "0")}</span>
            </header>
            <ul className="skill-group__list">
              {g.skills.map((s) => (
                <li key={s.name} className="skill" title={s.description}>
                  <span className="skill__name">{s.name}</span>
                  <Meter rating={s.rating} />
                  <span className="visually-hidden">
                    {LEVELS[s.rating] ?? ""}, {s.rating} of 5
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}

function Meter({ rating }: { rating: number }) {
  return (
    <span className="meter" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} data-on={n <= rating || undefined} />
      ))}
    </span>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
