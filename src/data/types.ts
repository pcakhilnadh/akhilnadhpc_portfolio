/**
 * Shapes of the JSON data files (src/data/*.json). The loader in index.ts
 * assigns each JSON file to one of these types, so a field that is missing or
 * has the wrong type fails `npm run build` instead of failing in the browser.
 * Editors also get autocomplete from the matching schemas in ./schemas.
 */

export interface Social {
  platform: string;
  url: string;
  username?: string;
  primary?: boolean;
}

export interface Interest {
  name: string;
  description?: string;
  level?: string;
}

/** profile.json: who you are. Drives the landing page, page title, PWA name and footer. */
export interface Profile {
  firstName: string;
  lastName: string;
  title: string;
  /** Short bio shown on the landing page */
  summary: string;
  /** What the avatar says when opened */
  avatarGreeting: string;
  /** Long bio for the About section; blank lines separate paragraphs */
  about?: string;
  /** Summary paragraph at the top of the downloadable resume */
  resumeSummary?: string;
  /** Name as printed on the resume; defaults to firstName + lastName */
  resumeName?: string;
  /** Resume headline under the name; defaults to title */
  headline?: string;
  email: string;
  /** Where you live now */
  location: { city: string; state?: string; country: string };
  /** Where you are from, if different from location */
  hometown?: string;
  achievements?: string[];
  careerStart?: string;
  repoUrl: string;
  socials?: Social[];
  interests?: Interest[];
}

export interface Education {
  degree: string;
  field?: string;
  institution: string;
  url?: string;
  startYear: number;
  endYear: number;
  grade?: string;
  /** false leaves it off the downloadable resume */
  resume?: boolean;
}

export interface Skill {
  name: string;
  /** 1 (familiar) to 5 (expert); unrated skills show without the meter */
  rating?: number;
  description?: string;
}

export interface SkillGroup {
  category: string;
  description?: string;
  skills: Skill[];
  /** false leaves it off the downloadable resume */
  resume?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  url?: string;
  description?: string;
  /** Skill names from skills.json */
  skills?: string[];
}

export interface Reference {
  name: string;
  role?: string;
  linkedin?: string;
  relationship?: string;
}

export interface Experience {
  company: string;
  location?: string;
  role: string;
  start: string;
  /** Omitted for the current job */
  end?: string;
  url?: string;
  /** One line about the company or client */
  context?: string;
  /** What you did there, one bullet each */
  highlights?: string[];
  references?: Reference[];
}

export interface Service {
  title: string;
  description: string;
  category?: string;
  features?: string[];
}

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  projectType: string;
  domain?: string[];
  industry?: string[];
  skills?: string[];
  status: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  role?: string;
  /** false leaves it off the downloadable resume */
  resume?: boolean;
  /** Matches a company in experience.json */
  company?: string;
  teamSize?: number;
  highlights?: { label: string; value: string; category?: string }[];
  problemStatement?: string;
  businessImpact?: string[];
  architectureOverview?: string;
  workflowSteps?: string[];
  architectureImage?: string;
  datasets?: Record<string, unknown>[];
  models?: Record<string, unknown>[];
  deployment?: Record<string, unknown>;
  operations?: Record<string, unknown>;
  technologies?: string[];
  frameworks?: string[];
  libraries?: string[];
  cloudServices?: string[];
  dashboardTools?: string[];
  /** Source code, e.g. a GitHub repository */
  repoUrl?: string;
  /** The running app or site */
  liveUrl?: string;
  thumbnailUrl?: string;
  images?: string[];
  tags?: string[];
}

/** personal.json: sensitive details. Deliberately NOT exported from index.ts, so the website cannot ship it. */
export interface Personal {
  /** "YYYY-MM": month and year only, the full date is deliberately not stored */
  birthMonth?: string;
  placeOfBirth?: string;
  maritalStatus?: string;
  address?: { street?: string; postalCode?: string };
  family?: { relationship: string; name: string; occupation?: string; birthMonth?: string; profileUrl?: string }[];
}
