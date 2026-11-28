/**
 * Date helpers for the data files' "YYYY-MM-DD" strings. Everything is read
 * as UTC, so a date never shifts by a day in a timezone west of Greenwich.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(iso: string) {
  const d = new Date(iso);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
}

/** "2019-12-03" → "Dec 2019" */
export function monthYear(iso: string): string {
  const { y, m } = parts(iso);
  return `${MONTHS[m]} ${y}`;
}

/** Whole months from `start` to `end` (today when omitted), counting both ends. */
export function monthsBetween(start: string, end?: string): number {
  const a = parts(start);
  const b = end ? parts(end) : { y: new Date().getUTCFullYear(), m: new Date().getUTCMonth() };
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1);
}

/**
 * Whole years of experience since `start`: months counted inclusively, then
 * rounded down (Dec 2019 → Nov 2026 is 84 months = 7). The About card, the
 * resume, the bios' {years} and the search description all use this.
 */
export function yearsSince(start: string, end?: string): number {
  return Math.floor(monthsBetween(start, end) / 12);
}

/** 58 → "4 yrs 10 mos" */
export function formatMonths(total: number): string {
  const y = Math.floor(total / 12);
  const m = total % 12;
  const out = [];
  if (y) out.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) out.push(`${m} mo${m > 1 ? "s" : ""}`);
  return out.join(" ");
}

/** "Dec 2019 – Oct 2024" or "Oct 2024 – Present" */
export function period(start: string, end?: string): string {
  return `${monthYear(start)} – ${end ? monthYear(end) : "Present"}`;
}
