import { geoEqualEarth, geoPath } from "d3-geo";
import countriesIso from "i18n-iso-countries";
import { useEffect, useMemo, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldUrl from "world-atlas/countries-110m.json?url";
import type { CountryCount } from "./types";

const W = 960;
const H = 470;
/** Lightest → brightest. On this dark theme, more visitors = more light. */
const STEPS = ["var(--c-4)", "var(--c-6)", "var(--c-7)", "var(--c-9)"] as const;
const EMPTY = "var(--c-2)";

interface Shape {
  id: string;
  name: string;
  d: string;
}

interface Hit {
  name: string;
  /** all-time visitors */
  users: number;
  /** visitors in the last 30 minutes */
  now: number;
}

/** ISO alpha-2 ("IN", from GA4) → the map's ISO numeric id ("356"). */
const numericId = (alpha2: string) => {
  const n = countriesIso.alpha2ToNumeric(alpha2);
  return n ? String(n).padStart(3, "0") : null;
};

/**
 * Equal Earth world map. Countries are shaded by all-time visitors; countries
 * with someone on the site in the last 30 minutes also pulse gently.
 */
export default function WorldMap({ countries, live }: { countries: CountryCount[]; live: CountryCount[] }) {
  const [shapes, setShapes] = useState<Shape[] | null>(null);
  const [hover, setHover] = useState<Hit | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(worldUrl)
      .then((r) => r.json())
      .then((topo: Topology<{ countries: GeometryCollection<{ name: string }> }>) => {
        const fc = feature(topo, topo.objects.countries);
        // Antarctica takes a lot of room and nobody browses from there.
        const list = fc.features.filter((f) => f.id !== "010");
        const projection = geoEqualEarth().fitSize([W, H], { type: "FeatureCollection", features: list });
        const path = geoPath(projection);
        if (alive)
          setShapes(
            list.map((f, i) => ({ id: String(f.id ?? `x${i}`), name: f.properties?.name ?? "", d: path(f) ?? "" })),
          );
      })
      .catch(() => alive && setShapes([]));
    return () => {
      alive = false;
    };
  }, []);

  const hits = useMemo(() => {
    const m = new Map<string, Hit>();
    for (const c of countries) {
      const id = numericId(c.code);
      if (id) m.set(id, { name: c.name, users: c.users, now: 0 });
    }
    for (const c of live) {
      const id = numericId(c.code);
      if (!id) continue;
      const hit = m.get(id);
      if (hit) hit.now = c.users;
      else m.set(id, { name: c.name, users: 0, now: c.users });
    }
    return m;
  }, [countries, live]);

  const max = Math.max(1, ...countries.map((c) => c.users));
  const step = (users: number) =>
    STEPS[Math.max(0, Math.min(STEPS.length - 1, Math.floor((Math.log1p(users) / Math.log1p(max)) * STEPS.length - 1e-9)))];
  const liveCount = live.length;

  if (!shapes) return <div className="map map--loading" />;

  // Live countries last, so their (reduced-motion) outline sits over the neighbours' borders.
  const ordered = [...shapes].sort((a, b) => Number((hits.get(a.id)?.now ?? 0) > 0) - Number((hits.get(b.id)?.now ?? 0) > 0));

  const describe = (h: Hit) =>
    [
      h.users > 0 ? `${h.users.toLocaleString("en")} ${h.users === 1 ? "visitor" : "visitors"}` : null,
      h.now > 0 ? `${h.now} here now` : null,
    ]
      .filter(Boolean)
      .join(" · ");

  return (
    <div className="map">
      <p className="map__readout" aria-live="polite">
        {hover ? (
          <>
            <strong>{hover.name}</strong> {describe(hover)}
          </>
        ) : (
          <span>Hover a lit country</span>
        )}
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="map__svg"
        role="img"
        aria-label={`World map: ${countries.length} countries with visitors, ${liveCount} with someone here now`}
      >
        {ordered.map((s) => {
          const hit = hits.get(s.id);
          // A live-only country (not in the totals yet) gets the lightest step.
          const fill = !hit ? EMPTY : hit.users > 0 ? step(hit.users) : STEPS[0];
          const isLive = (hit?.now ?? 0) > 0;
          return (
            <path
              key={s.id}
              d={s.d}
              fill={fill}
              className={[hit && "map__lit", isLive && "map__now"].filter(Boolean).join(" ") || undefined}
              tabIndex={hit ? 0 : undefined}
              aria-label={hit ? `${hit.name}: ${describe(hit)}` : undefined}
              onMouseEnter={hit ? () => setHover(hit) : undefined}
              onFocus={hit ? () => setHover(hit) : undefined}
              onMouseLeave={() => setHover(null)}
              onBlur={() => setHover(null)}
            />
          );
        })}
      </svg>
      <div className="map__legend" aria-hidden="true">
        <span>
          <i style={{ background: EMPTY }} /> None
        </span>
        <span className="map__ramp">
          Fewer
          {STEPS.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
          More
        </span>
        <span>
          <i className="map__legend-now" /> Here now
        </span>
      </div>
    </div>
  );
}
