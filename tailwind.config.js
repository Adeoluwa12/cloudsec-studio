/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        surface: "var(--surface)",
        surfaceAlt: "var(--surface-alt)",
        hairline: "var(--hairline)",
        text: "var(--text)",
        textDim: "var(--text-dim)",
        accent: "var(--accent)",
        accentDim: "var(--accent-dim)",
        badge: "var(--badge)",
        warn: "var(--warn)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.04), 0 2px 8px rgba(16, 24, 40, 0.06)",
        card: "0 2px 6px rgba(16, 24, 40, 0.05), 0 8px 24px rgba(16, 24, 40, 0.08)",
        lift: "0 8px 20px rgba(16, 24, 40, 0.10), 0 20px 48px rgba(16, 24, 40, 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
