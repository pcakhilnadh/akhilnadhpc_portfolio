import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Core palette colors
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-bg)",
        },
        accent: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-bg)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-bg)",
        },
        tertiary: {
          DEFAULT: "var(--color-accent-indigo)",
          foreground: "var(--color-bg)",
        },
        "accent-indigo": {
          DEFAULT: "var(--color-accent-indigo)",
          foreground: "var(--color-bg)",
        },
        highlight: {
          DEFAULT: "var(--color-highlight)",
          foreground: "var(--color-bg)",
        },
        soft: {
          DEFAULT: "var(--color-soft)",
          foreground: "var(--color-text)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-text)",
        },
        
        // shadcn/ui compatibility mappings
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        card: {
          DEFAULT: "var(--color-bg)",
          foreground: "var(--color-text)",
        },
        popover: {
          DEFAULT: "var(--color-bg)",
          foreground: "var(--color-text)",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "var(--color-bg)",
        },
        border: "color-mix(in srgb, var(--color-text) 20%, transparent)",
        input: "color-mix(in srgb, var(--color-text) 20%, transparent)",
        ring: "var(--color-primary)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "blink": "blink 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config; 