// Absolute file paths for vite.config.ts (kept here because the config is
// type-checked without Node's types).
import { fileURLToPath } from "node:url";

/** Stand-in for jsPDF's optional add-ons (html2canvas, dompurify, canvg). */
export const emptyModule = fileURLToPath(new URL("../src/lib/empty-module.ts", import.meta.url));
