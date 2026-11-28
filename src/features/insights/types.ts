/** What /api/insights returns. Totals only: never anything about one visitor. */
export interface Insights {
  /** ISO time the numbers were read from GA4 */
  updatedAt: string;
  /** The GA4 start date the totals count from, e.g. "365daysAgo" or "2026-11-28" */
  since: string;
  totals: {
    users: number;
    newUsers: number;
    returningUsers: number;
    sessions: number;
    views: number;
  };
  /** People on the site right now (GA4 realtime, last 30 minutes), or null if unavailable */
  liveNow: number | null;
  /** ISO 3166-1 alpha-2 code, GA4's English name, visitors */
  countries: { code: string; name: string; users: number }[];
  /** Top cities */
  places: { city: string; country: string; users: number }[];
  /** section_<id> events: how often, and by how many people */
  sections: { id: string; views: number; users: number }[];
  /** click_<id> events */
  clicks: { id: string; count: number }[];
}
