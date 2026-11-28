/*
 * Search-engine metadata, built from src/data at build time (see vite.config.ts).
 *
 * What recruiters type is decided here: ROLES and the title/description lines.
 * Everything else (name, location, skills, employers, schools, profiles) comes
 * from the JSON files, so it stays in step with the site.
 */
import educationData from "../src/data/education.json";
import experienceData from "../src/data/experience.json";
import profile from "../src/data/profile.json";
import skillsData from "../src/data/skills.json";

/** The job titles you want to be found for, most important first. */
export const ROLES = [
  "Senior Data Scientist",
  "Gen AI Consultant",
  "Gen AI Engineer",
  "Machine Learning Engineer",
  "Machine Learning Consultant",
  "AI Engineer",
];

const name = profile.resumeName; // "Akhil Nadh PC": how people write it
const legalName = `${profile.firstName} ${profile.lastName}`;
const { city, state, country } = profile.location;
export const siteUrl = profile.socials.find((s) => s.platform === "Portfolio Website")?.url ?? "";
const years = Math.round((Date.now() - new Date(profile.careerStart).getTime()) / (365.25 * 24 * 3600 * 1000));

/** Name first (people search it), then the roles. Google shows about 60 characters. */
export const seoTitle = `${name} — Senior Data Scientist & Gen AI Consultant | Machine Learning`;

/** Google shows about 155 characters. */
export const seoDescription =
  `${name}: Senior Data Scientist and Gen AI & Machine Learning consultant in ${city}. ` +
  `${years}+ years building LLM, RAG and computer vision solutions.`;

const skills = skillsData.groups.flatMap((g) => g.skills.map((s) => s.name));

/** Bing still reads this; Google ignores it. Harmless either way. */
export const keywords = [
  name,
  legalName,
  ...ROLES,
  "Data Scientist",
  "Generative AI",
  "LLM",
  "RAG",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "MLOps",
  `Data Scientist ${city}`,
  `Gen AI Consultant ${country}`,
  ...skills.slice(0, 20),
].join(", ");

const current = experienceData.experience.find((e) => !("end" in e) || !e.end);
const profileLinks = profile.socials
  .filter((s) => s.platform !== "Portfolio Website" && !s.url.includes("google.com/maps"))
  .map((s) => s.url);

/** schema.org data Google uses for name searches and its knowledge panel. */
export function jsonLd(dateModified: string) {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name,
    alternateName: [legalName, name.replace(/PC$/, "P C")],
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: ROLES[0],
    description: seoDescription,
    url: siteUrl,
    image: `${siteUrl}images/og.jpg`,
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: state, addressCountry: country },
    ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
    hasOccupation: ROLES.map((role) => ({
      "@type": "Occupation",
      name: role,
      occupationLocation: { "@type": "Country", name: country },
      skills: skills.slice(0, 15).join(", "),
    })),
    alumniOf: educationData.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
      ...("url" in e && e.url ? { url: e.url } : {}),
    })),
    knowsAbout: ["Generative AI", "Machine Learning", "Data Science", ...skills].slice(0, 45),
    sameAs: profileLinks,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteUrl}#website`, url: siteUrl, name, inLanguage: "en" },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}#profile`,
        url: siteUrl,
        name: seoTitle,
        isPartOf: { "@id": `${siteUrl}#website` },
        dateModified,
        mainEntity: { "@id": `${siteUrl}#person` },
      },
      person,
    ],
  };
  // "<" escaped so the JSON can never close the <script> tag early.
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

export const robotsTxt = () => `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}sitemap.xml\n`;

export const sitemapXml = (lastmod: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
