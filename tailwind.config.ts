import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
        },
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
        user: {
          bubble: "var(--user-bubble)",
          text: "var(--user-text)",
        }
      },
      maxWidth: {
        container: "1200px",
      },
      borderRadius: {
        DEFAULT: "10px",
        card: "14px",
        lg: "18px",
        hero: "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(17, 26, 20, 0.04), 0 4px 14px rgba(17, 26, 20, 0.04)",
        cardHover: "0 4px 16px rgba(17, 26, 20, 0.08), 0 12px 28px rgba(17, 26, 20, 0.06)",
        lifted: "0 20px 50px rgba(17, 26, 20, 0.12)",
        glow: "0 0 40px rgba(27, 107, 53, 0.15)",
        inner: "inset 0 2px 4px rgba(17, 26, 20, 0.04)",
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem, 6vw, 5.5rem)",
          { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        display: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        h1: ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        body: ["1rem", { lineHeight: "1.75" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        xs: ["0.75rem", { lineHeight: "1.5" }],
        label: [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" },
        ],
      },
      fontFamily: {
        heading: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        hero: ["var(--font-orbitron)", "var(--font-urbanist)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(.22,.9,.3,1)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
