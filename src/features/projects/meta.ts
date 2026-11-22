import { experience } from "../../data/experience";
import type { Project } from "../../data/types";

/** Personal vs work, from projectType. */
export type Kind = "professional" | "personal";
export const kindOf = (p: Project): Kind => (p.projectType === "Personal" ? "personal" : "professional");

/** Everything a project was built with, de-duplicated (first spelling wins). */
export function stackOf(p: Project): string[] {
  const all = [...(p.technologies ?? []), ...(p.frameworks ?? []), ...(p.libraries ?? []), ...(p.cloudServices ?? []), ...(p.dashboardTools ?? [])];
  const seen = new Set<string>();
  return all.filter((s) => {
    const k = s.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Stack plus tags: what the skill filter matches against. */
export const skillsOf = (p: Project): string[] => {
  const seen = new Set<string>();
  return [...stackOf(p), ...(p.tags ?? [])].filter((s) => {
    const k = s.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

/** Does the project fall under this focus area? (domains, tags and stack vs the area's terms) */
export function inArea(p: Project, terms: string[]): boolean {
  const mine = new Set([...(p.domain ?? []), ...skillsOf(p)].map((s) => s.toLowerCase()));
  return terms.some((t) => mine.has(t.toLowerCase()));
}

const today =new Date().toISOString().slice(0, 10);

/**
 * How recent a project is, for "latest first": its end date, or today while
 * it is ongoing. Projects without dates fall back to their job's dates;
 * projects with neither sort last.
 */
export function recency(p: Project): string {
  if (p.startDate) return p.endDate ?? today;
  const job = p.company ? experience.find((j) => j.company === p.company) : undefined;
  if (job) return job.end ?? today;
  return "";
}

/** Lower-cased text the search box looks through. */
export function haystack(p: Project): string {
  return [p.title, p.shortDescription, p.longDescription, p.company, p.role, ...(p.domain ?? []), ...(p.industry ?? []), ...skillsOf(p)]
    .filter(Boolean)
    .join(" \n ")
    .toLowerCase();
}

/** Ask the Projects section to open a project's case study (used by Experience). */
export const OPEN_PROJECT_EVENT = "open-project";
export const openProject = (slug: string) => window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: slug }));
