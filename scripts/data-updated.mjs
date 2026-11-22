// "Last updated" for the resume: the date of the last commit that touched
// src/data, or today when those files have uncommitted edits (or git is not
// available). Used by vite.config.ts at build time.
import { execSync } from "node:child_process";

export function dataUpdated() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const git = (cmd) => execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (git("git status --porcelain -- src/data")) return today;
    return git("git log -1 --format=%cs -- src/data") || today;
  } catch {
    return today;
  }
}
