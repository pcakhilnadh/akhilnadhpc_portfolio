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
  /** Where you live now, short: "Chennai, India" */
  location: [profile.location.city, profile.location.country].join(", "),
  hometown: profile.hometown,
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
  { label: "Resume", href: "#resume" },
];

/**
 * Google Analytics 4. The Measurement ID is public by design (it ships in every
 * page). Tracking only runs on the deployed site, never on localhost.
 */
export const analytics = {
  measurementId: "G-28D8GDKC6E",
  /** Every section whose visits are counted, in page order, with its display name. */
  sections: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "certificates", label: "Certificates" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
    { id: "insights", label: "Insights" },
  ],
  /** Click events sent with track(), and how the Insights section names them. */
  clicks: [
    { id: "resume_download", label: "Resume downloads" },
    { id: "email", label: "Email clicks" },
    { id: "project_open", label: "Projects opened" },
    { id: "chat", label: "Avatar chats" },
  ],
} as const;

/** Where the header's "Let's talk" button goes. */
export const contactHref = "#contact";
