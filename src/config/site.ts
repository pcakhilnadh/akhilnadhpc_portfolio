import { personalProfile, socialProfiles, workExperience } from "../data";

/** Presentation-level identity. Content lives in src/data; this picks what the site shows. */
export const site = {
  firstName: "Akhil Nadh",
  lastName: "Pullolikkal Chandran",
  fullName: "Akhil Nadh Pullolikkal Chandran",
  title: "Senior Data Scientist",
  email: personalProfile.email,
  location: `${personalProfile.address_city}, ${personalProfile.address_country}`,
  workStart: personalProfile.work_start_date,
  currentCompany: workExperience.find((w) => !w.end_date)?.company_name ?? "",
} as const;

const featured = ["LinkedIn", "GitHub", "Medium"];
export const socialLinks = featured
  .map((p) => socialProfiles.find((s) => s.platform === p))
  .filter((s): s is NonNullable<typeof s> => Boolean(s))
  .map((s) => ({ label: s.platform, href: s.profile_url }));

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

export function yearsOfExperience(from = site.workStart, now = new Date()): number {
  const start = new Date(from);
  return Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000));
}
