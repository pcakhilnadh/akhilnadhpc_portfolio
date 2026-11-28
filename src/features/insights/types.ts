/** What /api/insights returns. Totals only: never anything about one visitor. */

export interface CountryCount {
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** GA4's English name */
  name: string;
  users: number;
}
export interface SectionCount {
  id: string;
  views: number;
  users: number;
}
export interface ClickCount {
  id: string;
  count: number;
}

export interface Insights {
  /** ISO time the numbers were read from GA4 */
  updatedAt: string;
  /** The GA4 start date the totals count from, e.g. "365daysAgo" or "2026-11-28" */
  since: string;

  /* ---- Long-lasting: GA4 reports. Hours behind (24–48h for a new property). ---- */
  totals: {
    users: number;
    newUsers: number;
    returningUsers: number;
    sessions: number;
    views: number;
  };
  countries: CountryCount[];
  /** Top cities */
  places: { city: string; country: string; users: number }[];
  /** section_<id> events: how often, and by how many people */
  sections: SectionCount[];
  /** click_<id> events */
  clicks: ClickCount[];

  /* ---- Live: GA4 realtime, the last 30 minutes. Never added to the totals. ---- */
  /** null when the realtime report is unavailable */
  live: {
    users: number;
    countries: CountryCount[];
    sections: SectionCount[];
    clicks: ClickCount[];
  } | null;
}
