import { profile } from "../data/profile";

/**
 * What the site shows, derived from src/data/profile.json. Nothing here is
 * typed by hand: change your name, role, intro or email in profile.json and
 * the landing page, footer and navbar follow.
 */
export const site = {
  firstName: profile.firstName,
  lastName: profile.lastName,
  fullName: `${profile.firstName} ${profile.lastName}`,
  title: profile.title,
  intro: profile.intro,
  avatarGreeting: profile.avatarGreeting ?? `Hi, I'm ${profile.firstName}.`,
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
