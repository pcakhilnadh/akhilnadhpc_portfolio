/** Typed profile.json. The only dataset the landing page imports. */
import { yearsSince } from "../lib/dates";
import json from "./profile.json";
import type { Profile } from "./types";

/**
 * Writing {years} in summary, about or resumeSummary puts in your years of
 * experience, worked out from careerStart, so the bios never go stale.
 */
export function fillYears(text: string, careerStart = json.careerStart): string {
  return careerStart ? text.replaceAll("{years}", String(yearsSince(careerStart))) : text;
}

const raw: Profile = json;

export const profile: Profile = {
  ...raw,
  summary: fillYears(raw.summary),
  about: raw.about && fillYears(raw.about),
  resumeSummary: raw.resumeSummary && fillYears(raw.resumeSummary),
};
