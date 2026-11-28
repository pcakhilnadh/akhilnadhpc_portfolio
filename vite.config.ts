import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { dataUpdated } from "./scripts/data-updated.mjs";
import { emptyModule } from "./scripts/paths.mjs";
import { jsonLd, keywords, robotsTxt, seoDescription, seoTitle, siteUrl, sitemapXml } from "./scripts/seo";
import { fillYears } from "./src/data/profile";
import profile from "./src/data/profile.json";

/* The browser tab, share cards and installable-app name come from
   src/data/profile.json too, so there is one place to edit who you are. */
const fullName = `${profile.firstName} ${profile.lastName}`;
const pageTitle = `${fullName} — ${profile.title}`;
const description = `${fullName} is a ${profile.title}. ${fillYears(profile.summary).replace(/\s+/g, " ").trim()}`;
const updated = dataUpdated();

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Fills the %TOKENS% in index.html from the profile (search tags: scripts/seo.ts),
 * and writes robots.txt + sitemap.xml next to it.
 */
const htmlFromProfile = (): Plugin => ({
  name: "html-from-profile",
  transformIndexHtml: (html) =>
    html
      .replaceAll("%SEO_TITLE%", escapeHtml(seoTitle))
      .replaceAll("%PAGE_TITLE%", escapeHtml(pageTitle))
      .replaceAll("%FULL_NAME%", escapeHtml(profile.resumeName))
      .replaceAll("%SHORT_NAME%", escapeHtml(profile.firstName))
      .replaceAll("%DESCRIPTION%", escapeHtml(seoDescription))
      .replaceAll("%KEYWORDS%", escapeHtml(keywords))
      .replaceAll("%JSON_LD%", jsonLd(updated))
      .replaceAll("%SITE_URL%", escapeHtml(siteUrl)),
  generateBundle() {
    this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt() });
    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml(updated) });
  },
});

export default defineConfig({
  plugins: [
    react(),
    htmlFromProfile(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "logo.svg", "apple-touch-icon-180x180.png"],
      manifest: {
        id: "/",
        name: pageTitle,
        short_name: profile.firstName,
        description,
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#0a0a0a",
        theme_color: "#0a0a0a",
        categories: ["portfolio", "personalization", "education"],
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // The avatar model is precached so the whole landing page works offline.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,jpg,glb,woff2}"],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-css" },
          },
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-files",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  define: { __DATA_UPDATED__: JSON.stringify(updated) },
  resolve: {
    // jsPDF's optional add-ons (HTML/SVG rendering); the resume only draws text.
    alias: { html2canvas: emptyModule, dompurify: emptyModule, canvg: emptyModule },
  },
  server: { port: 5000 },
  // three.js lives in the lazily-loaded avatar chunk; it never blocks first paint.
  build: { chunkSizeWarningLimit: 1100 },
});
