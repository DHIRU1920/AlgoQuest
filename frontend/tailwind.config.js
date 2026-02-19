/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {

        /* ---------- Primary (buttons / links) ---------- */
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },

        /* ---------- Gray scale ---------- */
        gray: {
          900: "#020617",
          800: "#0f172a",
          700: "#1e293b",
          600: "#334155",
        },

        /* ---------- AlgoQuest Dark Theme ---------- */

        // Page Background
        bg: "#020617",

        // Sidebar panels
        sidebar: "#0f172a",

        // Cards
        card: "#111827",

        // MAIN card background (used in DailyChallenge)
        soft: "#111827",

        // Accent green (CTAs)
        brand: "#22c55e",

        // Decorative secondary colors
        sand: "#D9C4B0",
        accent: "#cbd5f5",

        // Text hierarchy
        text: "#f8fafc",   // main text (white)
        muted: "#94a3b8",  // secondary text
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
