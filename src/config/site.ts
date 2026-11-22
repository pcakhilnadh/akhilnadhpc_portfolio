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
 * In-page navigation. Each href is a section id rendered in App.tsx. An empty
 * list hides the nav and the mobile menu entirely.
 */
export const navLinks: readonly { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

/** Where the header's "Let's talk" button goes. */
export const contactHref = "#contact";
