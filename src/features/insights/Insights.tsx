import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Section } from "../../components/ui/Section";
import { analytics } from "../../config/site";
import { watchSection } from "../../lib/analytics";
import type { Insights as Data } from "./types";
import "./insights.css";

// d3-geo + the world outline only load once this section is near the screen.
const WorldMap = lazy(() => import("./WorldMap"));

const fmt = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

function sinceLabel(since: string) {
  const days = /^(\d+)daysAgo$/.exec(since)?.[1];
  if (days === "365") return "Last 12 months";
  if (days) return `Last ${days} days`;
  const d = new Date(since);
  return Number.isNaN(d.getTime())
    ? since
    : `Since ${d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
}

/** Fetches /api/insights; resolves to null when there is nothing to show. */
async function loadInsights(): Promise<Data | null> {
  try {
    const res = await fetch("/api/insights");
    // In `vite dev` there is no /api, and the SPA fallback answers with HTML.
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("json")) return null;
    const data = (await res.json()) as Data;
    return data.totals?.users > 0 ? data : null;
  } catch {
    return null;
  }
}

/**
 * Insights: where visitors come from and which parts of the site they use, from
 * GA4. Renders nothing at all until there is at least one visitor to show, so a
 * fresh or unconfigured site never shows an empty dashboard.
 */
export function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [data, setData] = useState<Data | null>(null);

  // Ask once the page has settled, so it never competes with first paint.
  useEffect(() => {
    let alive = true;
    const t = window.setTimeout(() => loadInsights().then((d) => alive && setData(d)), 1500);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  // Once shown: count it like any section, and load the map only when it's close.
  useEffect(() => {
    const el = ref.current;
    if (!data || !el) return;
    watchSection("insights");
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [data]);

  if (!data) return null;

  return (
    <Section id="insights" index="08" eyebrow="Insights" title="Insights" outline="Who's been here">
      <div ref={ref} className="insights">
        <div className="insights__meta">
          <span className="np-tag">{sinceLabel(data.since)}</span>
          {data.liveNow != null && data.liveNow > 0 && (
            <span className="np-tag insights__live">
              <span className="insights__dot" aria-hidden="true" />
              {data.liveNow} here now
            </span>
          )}
          <p className="insights__note">Counts visitors who accepted analytics cookies.</p>
        </div>

        <ul className="insights__stats" aria-label="Totals">
          <Stat label="Visitors" value={data?.totals.users} />
          <Stat label="Returning" value={data?.totals.returningUsers} />
          <Stat label="Visits" value={data?.totals.sessions} />
          <Stat label="Countries" value={data?.countries.length} />
        </ul>

        <figure className="insights__map np card">
          <figcaption className="insights__cap">Visitors by country</figcaption>
          {near ? (
            <Suspense fallback={<div className="map map--loading" />}>
              <WorldMap countries={data?.countries ?? []} />
            </Suspense>
          ) : (
            <div className="map map--loading" />
          )}
        </figure>

        <div className="insights__grid">
          <SectionUsage data={data} />
          <div className="insights__side">
            <TopList
              title="Top places"
              rows={(data?.places ?? []).map((p) => ({ key: `${p.city}|${p.country}`, label: p.city, sub: p.country, value: p.users }))}
            />
            <TopList
              title="Actions"
              rows={analytics.clicks.map((c) => ({
                key: c.id,
                label: c.label,
                value: data?.clicks.find((x) => x.id === c.id)?.count ?? 0,
              }))}
              showZero={!!data}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: number | undefined }) {
  return (
    <li className="istat np card">
      <span className="istat__value">{value == null ? "—" : fmt.format(value)}</span>
      <span className="istat__label">{label}</span>
    </li>
  );
}

/** One bar per section, in page order, sized by views. */
function SectionUsage({ data }: { data: Data | null }) {
  const rows = analytics.sections.map((s) => {
    const hit = data?.sections.find((x) => x.id === s.id);
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
                {data ? fmt.format(r.views) : "—"}
                <small>{data ? `${fmt.format(r.users)} people` : ""}</small>
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
