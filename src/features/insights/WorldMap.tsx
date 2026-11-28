import { geoEqualEarth, geoPath } from "d3-geo";
import countriesIso from "i18n-iso-countries";
import { useEffect, useMemo, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldUrl from "world-atlas/countries-110m.json?url";
import type { Insights } from "./types";

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

/** Equal Earth world map; each country is shaded by how many visitors came from it. */
export default function WorldMap({ countries }: { countries: Insights["countries"] }) {
  const [shapes, setShapes] = useState<Shape[] | null>(null);
  const [hover, setHover] = useState<{ name: string; users: number } | null>(null);

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

  // GA4 gives ISO alpha-2 ("IN"); world-atlas uses ISO numeric ("356").
  const byNumeric = useMemo(() => {
    const m = new Map<string, { name: string; users: number }>();
    for (const c of countries) {
      const n = countriesIso.alpha2ToNumeric(c.code);
      if (n) m.set(String(n).padStart(3, "0"), { name: c.name, users: c.users });
    }
    return m;
  }, [countries]);

  const max = Math.max(1, ...countries.map((c) => c.users));
  const step = (users: number) => STEPS[Math.min(STEPS.length - 1, Math.floor((Math.log1p(users) / Math.log1p(max)) * STEPS.length - 1e-9))];

  if (!shapes) return <div className="map map--loading" />;

  return (
    <div className="map">
      <p className="map__readout" aria-live="polite">
        {hover ? (
          <>
            <strong>{hover.name}</strong> {hover.users.toLocaleString("en")} {hover.users === 1 ? "visitor" : "visitors"}
          </>
        ) : (
          <span>Hover a lit country</span>
        )}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="map__svg" role="img" aria-label={`World map, ${countries.length} countries with visitors`}>
        {shapes.map((s) => {
          const hit = byNumeric.get(s.id);
          return (
            <path
              key={s.id}
              d={s.d}
              fill={hit ? step(hit.users) : EMPTY}
              className={hit ? "map__lit" : undefined}
              tabIndex={hit ? 0 : undefined}
              aria-label={hit ? `${hit.name}: ${hit.users} visitors` : undefined}
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
      </div>
    </div>
  );
}
