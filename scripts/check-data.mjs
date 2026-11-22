// Checks the data files for mistakes TypeScript can't see. Runs before every build (`npm run build`)
// and on demand with `npm run check:data`. No dependencies.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
const errors = [];
const fail = (file, msg) => errors.push(`  ${file}: ${msg}`);

// 1) every file parses
const data = {};
for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
  try {
    data[f.replace(".json", "")] = JSON.parse(readFileSync(join(dir, f), "utf8"));
  } catch (e) {
    fail(f, `not valid JSON (${e.message})`);
  }
}

const { profile, skills, certifications, experience, projects, education } = data;

// 2) dates are real calendar dates, and end is not before start
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().startsWith(s);
const checkDate = (file, where, v) => v !== undefined && !isDate(v) && fail(file, `${where}: "${v}" is not a valid YYYY-MM-DD date`);
const checkRange = (file, where, a, b) => a && b && isDate(a) && isDate(b) && b < a && fail(file, `${where}: ends (${b}) before it starts (${a})`);

checkDate("profile.json", "careerStart", profile?.careerStart);
(experience?.experience ?? []).forEach((e, i) => {
  const w = `experience[${i}] (${e.company})`;
  checkDate("experience.json", `${w}.start`, e.start);
  checkDate("experience.json", `${w}.end`, e.end);
  checkRange("experience.json", w, e.start, e.end);
});
(certifications?.certifications ?? []).forEach((c, i) => {
  checkDate("certifications.json", `certifications[${i}].issued`, c.issued);
  checkDate("certifications.json", `certifications[${i}].expires`, c.expires);
});
(projects?.projects ?? []).forEach((p, i) => {
  checkDate("projects.json", `projects[${i}].startDate`, p.startDate);
  checkDate("projects.json", `projects[${i}].endDate`, p.endDate);
  checkRange("projects.json", `projects[${i}] (${p.slug})`, p.startDate, p.endDate);
});
(education?.education ?? []).forEach((e, i) => e.endYear < e.startYear && fail("education.json", `education[${i}] (${e.degree}): ends before it starts`));

// 3) cross-references and uniqueness
const skillNames = (skills?.groups ?? []).flatMap((g) => g.skills.map((s) => s.name));
const seen = new Set();
for (const n of skillNames) {
  if (seen.has(n.toLowerCase())) fail("skills.json", `skill "${n}" appears twice`);
  seen.add(n.toLowerCase());
}
(certifications?.certifications ?? []).forEach((c) =>
  (c.skills ?? []).forEach((s) => !skillNames.includes(s) && fail("certifications.json", `"${c.name}" lists skill "${s}", which is not in skills.json`)),
);
const companies = (experience?.experience ?? []).map((e) => e.company);
const slugs = new Set();
(projects?.projects ?? []).forEach((p) => {
  if (p.company && !companies.includes(p.company)) fail("projects.json", `"${p.title}" has company "${p.company}", which is not in experience.json`);
  if (slugs.has(p.slug)) fail("projects.json", `slug "${p.slug}" is used twice`);
  slugs.add(p.slug);
});

// 4) the role on the landing page must be your current job's role
const currentJobs = (experience?.experience ?? []).filter((e) => !e.end);
if (profile?.title && currentJobs.length === 1 && currentJobs[0].role !== profile.title) {
  fail("profile.json", `title "${profile.title}" differs from your current job in experience.json ("${currentJobs[0].role}" at ${currentJobs[0].company}). Make them match.`);
}
if (currentJobs.length > 1) fail("experience.json", `${currentJobs.length} jobs have no "end" date; only your current job should`);

if (errors.length) {
  console.error(`\nData check failed (${errors.length}):\n${errors.join("\n")}\n`);
  process.exit(1);
}
console.log(`Data OK: ${Object.keys(data).length} files, ${skillNames.length} skills, ${(certifications?.certifications ?? []).length} certifications, ${companies.length} jobs, ${(projects?.projects ?? []).length} project(s).`);
