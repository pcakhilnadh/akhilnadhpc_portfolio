import { createSign } from "node:crypto";
import type { Insights } from "../src/features/insights/types";

/*
 * GET /api/insights — site-wide totals read from the GA4 Data API.
 *
 * Runs on Vercel only. It signs in as a Google Cloud service account, so the
 * key never reaches the browser. Needs these environment variables:
 *   GA_PROPERTY_ID        numeric GA4 property id (Admin → Property details), not the G- id
 *   GOOGLE_CLIENT_EMAIL   the service account's email
 *   GOOGLE_PRIVATE_KEY    the service account's private_key, as in the JSON key file
 *   INSIGHTS_SINCE        optional GA4 start date, default "365daysAgo"
 *
 * Responses are cached at Vercel's edge for an hour, so GA4 is asked at most
 * about 24 times a day however many people open the page.
 */

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://analyticsdata.googleapis.com/v1beta";

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

async function accessToken(email: string, key: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }));
  const sig = createSign("RSA-SHA256").update(`${head}.${claims}`).sign(key);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${head}.${claims}.${b64url(sig)}`,
    }),
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

interface Row {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
}
interface Report {
  rows?: Row[];
}

const dim = (r: Row, i = 0) => r.dimensionValues?.[i]?.value ?? "";
const num = (r: Row, i = 0) => Number(r.metricValues?.[i]?.value ?? 0);

const json = (body: unknown, status = 200, cache = true) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // One minute at the edge: fresh enough for the live layer, and still at most
      // ~60 GA4 calls an hour per region however many people visit.
      "cache-control": cache ? "public, max-age=30, s-maxage=60, stale-while-revalidate=600" : "no-store",
    },
  });

export async function GET(): Promise<Response> {
  const property = process.env.GA_PROPERTY_ID;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const since = process.env.INSIGHTS_SINCE || "365daysAgo";
  if (!property || !email || !key) return json({ error: "Insights are not configured yet." }, 503, false);

  try {
    const token = await accessToken(email, key);
    const call = async <T>(path: string, body: unknown): Promise<T> => {
      const res = await fetch(`${API}/properties/${property}:${path}`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`${path} ${res.status}: ${await res.text()}`);
      return (await res.json()) as T;
    };

    const dateRanges = [{ startDate: since, endDate: "today" }];
    const eventsStartingWith = (prefix: string) => ({
      filter: { fieldName: "eventName", stringFilter: { matchType: "BEGINS_WITH", value: prefix } },
    });

    // Realtime = the last 30 minutes, seconds behind. Reported separately from the
    // totals (never added to them: once GA4 catches up the same visit is in both).
    const realtime = (body: object) => call<Report>("runRealtimeReport", body);
    const liveReports = Promise.all([
      realtime({ metrics: [{ name: "activeUsers" }] }),
      realtime({ dimensions: [{ name: "countryId" }, { name: "country" }], metrics: [{ name: "activeUsers" }], limit: 250 }),
      realtime({
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }, { name: "activeUsers" }],
        dimensionFilter: { orGroup: { expressions: [eventsStartingWith("section_"), eventsStartingWith("click_")] } },
        limit: 100,
      }),
    ]).catch((err) => {
      console.error("insights realtime:", err);
      return null;
    });

    const [batch, live] = await Promise.all([
      call<{ reports: Report[] }>("batchRunReports", {
        requests: [
          { dateRanges, metrics: [{ name: "totalUsers" }, { name: "newUsers" }, { name: "sessions" }, { name: "screenPageViews" }] },
          { dateRanges, dimensions: [{ name: "newVsReturning" }], metrics: [{ name: "activeUsers" }] },
          { dateRanges, dimensions: [{ name: "countryId" }, { name: "country" }], metrics: [{ name: "totalUsers" }], limit: 250 },
          {
            dateRanges,
            dimensions: [{ name: "city" }, { name: "country" }],
            metrics: [{ name: "totalUsers" }],
            dimensionFilter: { notExpression: { filter: { fieldName: "city", stringFilter: { value: "(not set)" } } } },
            orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
            limit: 8,
          },
          {
            dateRanges,
            dimensions: [{ name: "eventName" }],
            metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
            dimensionFilter: { orGroup: { expressions: [eventsStartingWith("section_"), eventsStartingWith("click_")] } },
            limit: 100,
          },
        ],
      }),
      liveReports,
    ]);

    const [totalsR, returningR, countriesR, placesR, eventsR] = batch.reports;
    const t = totalsR.rows?.[0];
    const events = eventsR.rows ?? [];

    const countryRows = (rows: Row[] | undefined) =>
      (rows ?? []).map((r) => ({ code: dim(r, 0), name: dim(r, 1), users: num(r) })).filter((c) => /^[A-Z]{2}$/.test(c.code));
    const sectionRows = (rows: Row[]) =>
      rows
        .filter((r) => dim(r).startsWith("section_"))
        .map((r) => ({ id: dim(r).slice("section_".length), views: num(r, 0), users: num(r, 1) }));
    const clickRows = (rows: Row[]) =>
      rows.filter((r) => dim(r).startsWith("click_")).map((r) => ({ id: dim(r).slice("click_".length), count: num(r, 0) }));

    let liveBody: Insights["live"] = null;
    if (live) {
      const [usersR, liveCountriesR, liveEventsR] = live;
      const liveEvents = liveEventsR.rows ?? [];
      liveBody = {
        users: usersR.rows?.[0] ? num(usersR.rows[0]) : 0,
        countries: countryRows(liveCountriesR.rows),
        sections: sectionRows(liveEvents),
        clicks: clickRows(liveEvents),
      };
    }

    const body: Insights = {
      updatedAt: new Date().toISOString(),
      since,
      totals: {
        users: t ? num(t, 0) : 0,
        newUsers: t ? num(t, 1) : 0,
        returningUsers: (returningR.rows ?? []).filter((r) => dim(r) === "returning").reduce((s, r) => s + num(r), 0),
        sessions: t ? num(t, 2) : 0,
        views: t ? num(t, 3) : 0,
      },
      live: liveBody,
      countries: countryRows(countriesR.rows),
      places: (placesR.rows ?? []).map((r) => ({ city: dim(r, 0), country: dim(r, 1), users: num(r) })),
      sections: sectionRows(events),
      clicks: clickRows(events),
    };
    return json(body);
  } catch (err) {
    console.error("insights:", err);
    return json({ error: "Could not read analytics right now." }, 502, false);
  }
}
