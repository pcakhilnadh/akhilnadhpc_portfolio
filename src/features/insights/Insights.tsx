import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Section } from "../../components/ui/Section";
import { analytics } from "../../config/site";
import { watchSection } from "../../lib/analytics";
import type { Insights as Data } from "./types";
import "./insights.css";

// d3-geo + the world outline only load once this section is near the screen.
const WorldMap = lazy(() => import("./WorldMap"));

const fmt = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
/** How often the live layer refreshes while the tab is open. */
const REFRESH_MS = 60_000;

function sinceLabel(since: string) {
  const days = /^(\d+)daysAgo$/.exec(since)?.[1];
  if (days === "365") return "Last 12 months";
  if (days) return `Last ${days} days`;
  const d = new Date(since);
  return Number.isNaN(d.getTime())
    ? since
    : `Since ${d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
}

const hasTotals = (d: Data) => d.totals.users > 0;
const hasLive = (d: Data) => (d.live?.users ?? 0) > 0;

/** Adds b's counts into a's, matching rows by key. */
function mergeBy<T>(a: T[], b: T[], key: (x: T) => string, add: (x: T, y: T) => T): T[] {
  const m = new Map(a.map((x) => [key(x), x]));
  for (const y of b) {
    const x = m.get(key(y));
    m.set(key(y), x ? add(x, y) : y);
  }
  return [...m.values()];
}

/**
 * One view: GA4 reports (complete but 1–2 days behind) + realtime (the last
 * 30 minutes, seconds behind). The last 30 minutes are almost never in the
 * reports yet, so adding them gives the most up-to-date total available.
 */
function combine(d: Data) {
  const live = d.live ?? { users: 0, countries: [], sections: [], clicks: [] };
  const countries = mergeBy(d.countries, live.countries, (c) => c.code, (x, y) => ({ ...x, users: x.users + y.users }));
  return {
    users: d.totals.users + live.users,
    returning: d.totals.returningUsers,
    // Realtime has no "sessions"; each person active now is one visit in progress.
    visits: d.totals.sessions + live.users,
    countries,
    sections: mergeBy(d.sections, live.sections, (s) => s.id, (x, y) => ({ ...x, views: x.views + y.views, users: x.users + y.users })),
    clicks: mergeBy(d.clicks, live.clicks, (c) => c.id, (x, y) => ({ ...x, count: x.count + y.count })),
    places: d.places,
    liveUsers: live.users,
    liveCountries: live.countries,
  };
}
type Combined = ReturnType<typeof combine>;

/** Fetches /api/insights; null when it isn't available (dev, not configured, error). */
async function loadInsights(): Promise<Data | null> {
  try {
    const res = await fetch("/api/insights");
    // In `vite dev` there is no /api, and the SPA fallback answers with HTML.
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("json")) return null;
    return (await res.json()) as Data;
  } catch {
    return null;
  }
}

/**
 * Insights: where visitors come from and which parts of the site they use, from
 * GA4, as one combined view (see combine()). Refreshes every minute; the map
 * also outlines countries with someone on the site right now. Hidden until
 * there's a visitor to show; once shown it stays for the page view.
 */
export function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  // First ask once the page has settled, then refresh every minute while the tab is visible.
  useEffect(() => {
    let alive = true;
    const refresh = () =>
      loadInsights().then((d) => {
        if (!alive || !d) return;
        // Show once there's something; after that, keep updating (even back to zero live).
        setData((prev) => (prev || hasTotals(d) || hasLive(d) ? d : prev));
      });
    const first = window.setTimeout(refresh, 1500);
    const timer = window.setInterval(() => document.visibilityState === "visible" && refresh(), REFRESH_MS);
    return () => {
      alive = false;
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  const shown = data !== null;
  // Once shown: count it like any section, and load the map only when it's close.
  useEffect(() => {
    const el = ref.current;
    if (!shown || !el) return;
    watchSection("insights");
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  if (!data) return null;

  const c = combine(data);

  return (
    <Section id="insights" index="08" eyebrow="Insights" title="Insights" outline="Who's been here">
      <div ref={ref} className="insights">
        <div className="insights__meta">
          <span className="np-tag">{sinceLabel(data.since)}</span>
          <span className="np-tag insights__live" data-on={c.liveUsers > 0}>
            <span className="insights__dot" aria-hidden="true" />
            {c.liveUsers} here now
          </span>
          <p className="insights__note">Updates every minute. Counts visitors who accepted analytics cookies.</p>
        </div>

        <ul className="insights__stats" aria-label="Totals">
          <Stat label="Visitors" value={c.users} />
          <Stat label="Returning" value={c.returning} />
          <Stat label="Visits" value={c.visits} />
          <Stat label="Countries" value={c.countries.length} />
        </ul>

        <figure className="insights__map np card">
          <figcaption className="insights__cap">Visitors by country</figcaption>
          {near ? (
            <Suspense fallback={<div className="map map--loading" />}>
              <WorldMap countries={c.countries} live={c.liveCountries} />
            </Suspense>
          ) : (
            <div className="map map--loading" />
          )}
        </figure>

        <div className="insights__grid">
          <SectionUsage c={c} />
          <div className="insights__side">
            {c.places.length > 0 && (
              <TopList
                title="Top places"
                rows={c.places.map((p) => ({ key: `${p.city}|${p.country}`, label: p.city, sub: p.country, value: p.users }))}
              />
            )}
            <TopList
              title="Actions"
              rows={analytics.clicks.map((a) => ({
                key: a.id,
                label: a.label,
                value: c.clicks.find((x) => x.id === a.id)?.count ?? 0,
              }))}
              showZero
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <li className="istat np card">
      <span className="istat__value">{fmt.format(value)}</span>
      <span className="istat__label">{label}</span>
    </li>
  );
}

/** One bar per section, in page order, sized by views (reports + live). */
function SectionUsage({ c }: { c: Combined }) {
  const rows = analytics.sections.map((s) => {
    const hit = c.sections.find((x) => x.id === s.id);
    return { ...s, views: hit?.views ?? 0, users: hit?.users ?? 0 };
  });
  const max = Math.max(1, ...rows.map((r) => r.views));

  return (
    <div className="np card">
      <h3 className="insights__cap">Section views</h3>
      <table className="usage">
        <thead className="visually-hidden">
          <tr>
            <th scope="col">Section</th>
            <th scope="col">Views</th>
            <th scope="col">People</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <th scope="row" className="usage__name">
                {r.label}
              </th>
              <td className="usage__bar" aria-hidden="true">
                <span style={{ width: `${(r.views / max) * 100}%` }} />
              </td>
              <td className="usage__num">
                {fmt.format(r.views)}
                <small>{`${fmt.format(r.users)} ${r.users === 1 ? "person" : "people"}`}</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TopRow {
  key: string;
  label: string;
  sub?: string;
  value: number;
}

function TopList({ title, rows, showZero = false }: { title: string; rows: TopRow[]; showZero?: boolean }) {
  return (
    <div className="np card">
      <h3 className="insights__cap">{title}</h3>
      {rows.length === 0 || (!showZero && rows.every((r) => r.value === 0)) ? (
        <p className="insights__none">No data yet.</p>
      ) : (
        <ol className="toplist">
          {rows.map((r) => (
            <li key={r.key}>
              <span className="toplist__label">
                {r.label}
                {r.sub && <small>{r.sub}</small>}
              </span>
              <span className="toplist__value">{fmt.format(r.value)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
