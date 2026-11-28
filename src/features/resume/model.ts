import { education } from "../../data/education";
import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { skillGroups } from "../../data/skills";
import { monthYear, period, yearsSince } from "../../lib/dates";

/**
 * The resume as plain data, built from src/data. The on-page preview and the
 * PDF both render this, so they can never disagree. Entries with
 * `"resume": false` in the JSON are left out. The phone number is not here:
 * only the PDF adds it (see pdf.ts).
 */
export interface ResumeDoc {
  name: string;
  headline: string;
  location: string;
  /** Email and profile links, in print order */
  links: { text: string; href: string }[];
  summary: string;
  totalYears: number | null;
  experience: { role: string; company: string; location?: string; period: string; context?: string; bullets: string[] }[];
  projects: { title: string; text: string }[];
  skills: { group: string; items: string[] }[];
  education: { degree: string; institution: string; period: string }[];
  achievements: string[];
  /** "22 Nov 2026" */
  updated: string;
  updatedIso: string;
}

/** Profiles printed under the name, by platform name in profile.json. */
const LINK_PLATFORMS = ["LinkedIn", "GitHub", "Portfolio Website"];

const bareUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function buildResume(): ResumeDoc {
  const { city, state, country } = profile.location;
  const socials = profile.socials ?? [];
  const links = [
    { text: profile.email, href: `mailto:${profile.email}` },
    ...LINK_PLATFORMS.flatMap((p) => {
      const s = socials.find((x) => x.platform === p);
      return s ? [{ text: bareUrl(s.url), href: s.url }] : [];
    }),
  ];

  const jobs = [...experience].sort((a, b) => (a.start < b.start ? 1 : -1));
  const updatedDate = new Date(__DATA_UPDATED__);

  return {
    name: profile.resumeName ?? `${profile.firstName} ${profile.lastName}`,
    headline: profile.headline ?? profile.title,
    location: [city, state, country].filter(Boolean).join(", "),
    links,
    summary: (profile.resumeSummary ?? profile.summary).replace(/\s+/g, " ").trim(),
    totalYears: profile.careerStart ? yearsSince(profile.careerStart) : null,
    experience: jobs.map((j) => ({
      role: j.role,
      company: j.company,
      location: j.location,
      period: period(j.start, j.end),
      context: j.context,
      bullets: j.highlights ?? [],
    })),
    projects: projects
      .filter((p) => p.resume !== false)
      .map((p) => ({ title: p.title, text: p.longDescription ?? p.shortDescription })),
    skills: skillGroups
      .filter((g) => g.resume !== false)
      .map((g) => ({ group: g.category, items: g.skills.map((s) => s.name) })),
    education: [...education]
      .filter((e) => e.resume !== false)
      .sort((a, b) => b.endYear - a.endYear)
      .map((e) => ({
        degree: e.field ? `${e.degree} in ${e.field}` : e.degree,
        institution: e.institution,
        period: `${e.startYear} – ${e.endYear}`,
      })),
    achievements: profile.achievements ?? [],
    updated: `${updatedDate.getUTCDate()} ${monthYear(__DATA_UPDATED__)}`,
    updatedIso: __DATA_UPDATED__,
  };
}
