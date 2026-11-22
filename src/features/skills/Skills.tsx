import { Section } from "../../components/ui/Section";
import { skillGroups } from "../../data/skills";
import type { SkillGroup } from "../../data/types";
import "./skills.css";

/**
 * Skills as a ruled list: one full-width row per group (number, name, count)
 * with its skills as uniform chips. The groups that go on the resume come
 * first; the rest sit under "Also worked with".
 */
export function Skills() {
  const core = skillGroups.filter((g) => g.resume !== false);
  const more = skillGroups.filter((g) => g.resume === false);

  return (
    <Section id="skills" index="04" eyebrow="Skills" title="Skills" outline="The toolbox">
      <SkillRows groups={core} />
      {more.length > 0 && (
        <>
          <h3 className="subhead skills__more">Also worked with</h3>
          <SkillRows groups={more} compact />
        </>
      )}
    </Section>
  );
}

function SkillRows({ groups, compact = false }: { groups: SkillGroup[]; compact?: boolean }) {
  return (
    <ol className={`skill-rows${compact ? " skill-rows--compact" : ""}`}>
      {groups.map((g, i) => (
        <li key={g.category} className="skill-row">
          <div className="skill-row__head">
            {!compact && <span className="skill-row__index">{String(i + 1).padStart(2, "0")}</span>}
            <h4 className="skill-row__title">{g.category}</h4>
            <span className="skill-row__count">{g.skills.length}</span>
          </div>
          <ul className="skill-chips" aria-label={g.category}>
            {g.skills.map((s) => (
              <li key={s.name} className="skill-chip" title={s.description}>
                {s.name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
