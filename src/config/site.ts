import { profile } from "../data/profile";

/**
 * What the site shows, derived from src/data/profile.json. Nothing here is
 * typed by hand: change your name, role, summary or email in profile.json and
 * the landing page, footer and navbar follow.
 */
export const site = {
  firstName: profile.firstName,
  lastName: profile.lastName,
  fullName: `${profile.firstName} ${profile.lastName}`,
  title: profile.title,
  /** The short bio, on one line (line breaks in the JSON are ignored). */
  summary: profile.summary.replace(/\s+/g, " ").trim(),
  avatarGreeting: profile.avatarGreeting,
  email: profile.email,
  repoUrl: profile.repoUrl,
  location: [profile.location.city, profile.location.country].join(", "),
};

/**
 * In-page navigation. Empty while the site is a single landing page; add
 * { label, href } entries as the other pages/sections are built and the
 * header (nav + mobile menu) will appear automatically.
 */
export const navLinks: readonly { label: string; href: string }[] = [];
