/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /**
   * Phone number printed on the downloadable resume, e.g. "+91 98765 43210".
   * Set it in .env.local (git-ignored) and in the hosting provider's
   * environment variables. It is deliberately not stored in src/data.
   */
  readonly VITE_RESUME_PHONE?: string;
}

/** "YYYY-MM-DD": when src/data last changed (set in vite.config.ts). */
declare const __DATA_UPDATED__: string;
