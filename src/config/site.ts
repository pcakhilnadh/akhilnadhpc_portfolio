import { personalProfile, workExperience } from "../data";

/** Presentation-level identity. Content lives in src/data; this picks what the site shows. */
export const site = {
  firstName: "Akhil Nadh",
  lastName: "Pullolikkal Chandran",
  fullName: "Akhil Nadh Pullolikkal Chandran",
  title: "Senior Data Scientist",
  intro:
    "I design and ship computer-vision and LLM systems, from passport & visa verification to passenger-flow analytics, for aviation at scale.",
  email: personalProfile.email,
  repoUrl: "https://github.com/pcakhilnadh/akhilnadhpc_portfolio",
  location: `${personalProfile.address_city}, ${personalProfile.address_country}`,
  workStart: personalProfile.work_start_date,
  currentCompany: workExperience.find((w) => !w.end_date)?.company_name ?? "",
} as const;

/**
 * In-page navigation. Empty while the site is a single landing page; add
 * { label, href } entries as the other pages/sections are built and the
 * header (nav + mobile menu) will appear automatically.
 */
export const navLinks: readonly { label: string; href: string }[] = [];
