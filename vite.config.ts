import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import profile from "./src/data/profile.json";

/* The browser tab, share cards and installable-app name come from
   src/data/profile.json too, so there is one place to edit who you are. */
const fullName = `${profile.firstName} ${profile.lastName}`;
const pageTitle = `${fullName} — ${profile.title}`;
const description = `${fullName} is a ${profile.title}. ${profile.intro}`;
const siteUrl = profile.socials.find((s) => s.platform === "Portfolio Website")?.url ?? "";

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Fills the %TOKENS% in index.html from the profile. */
const htmlFromProfile = (): Plugin => ({
  name: "html-from-profile",
  transformIndexHtml: (html) =>
    html
      .replaceAll("%PAGE_TITLE%", escapeHtml(pageTitle))
      .replaceAll("%FULL_NAME%", escapeHtml(fullName))
      .replaceAll("%SHORT_NAME%", escapeHtml(profile.firstName))
      .replaceAll("%DESCRIPTION%", escapeHtml(description))
      .replaceAll("%SITE_URL%", escapeHtml(siteUrl)),
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
  server: { port: 5000 },
  // three.js lives in the lazily-loaded avatar chunk; it never blocks first paint.
  build: { chunkSizeWarningLimit: 1100 },
});
