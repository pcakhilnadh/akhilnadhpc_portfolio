import { Timeline, type TimelineItem } from "../../components/ui/Timeline";
import { education } from "../../data/education";

/** Degrees from education.json on the shared timeline, latest first. */
export function Education() {
  const items: TimelineItem[] = education.map((e) => ({
    key: `${e.degree}-${e.startYear}`,
    sortDate: String(e.endYear),
    period: `${e.startYear} – ${e.endYear}`,
    title: e.field ? `${e.degree} · ${e.field}` : e.degree,
    org: e.institution,
    orgUrl: e.url,
    meta: e.grade,
  }));

  return (
    <div id="education" className="about__education">
      <h3 className="subhead">
        Education <small>{String(education.length).padStart(2, "0")}</small>
      </h3>
      <Timeline items={items} label="Education" />
    </div>
  );
}
