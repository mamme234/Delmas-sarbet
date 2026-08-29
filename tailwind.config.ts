import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand palette — inspired by Ethiopian coffee culture,
        // woven textiles, and hand-worked gold jewelry.
        ink: {
          DEFAULT: "#1B1310", // espresso near-black, dark section base
          soft: "#241A16",
          light: "#332420",
        },
        parchment: {
          DEFAULT: "#F6F0E4", // warm ivory, light section base
          dim: "#EFE6D3",
          deep: "#E4D6B8",
        },
        wine: {
          DEFAULT: "#6E1423", // deep berry/wine red
          light: "#8C1F30",
          dark: "#4E0E19",
        },
        gold: {
          DEFAULT: "#C9A24B", // brass / coffee-pot gold
          light: "#DDBE73",
          dark: "#A5813A",
        },
        clay: {
          DEFAULT: "#A8532E", // burnt sienna / terracotta
          light: "#C06B41",
          dark: "#7E3D21",
        },
        forest: {
          DEFAULT: "#22402B", // muted, deep green
          light: "#31593D",
        },
      },
      fontFamily: {
        display: ["\"Fraunces\"", "Georgia", "serif"],
        body: ["\"Work Sans\"", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        card: "0 12px 32px -12px rgba(27, 19, 16, 0.35)",
        lift: "0 24px 48px -16px rgba(27, 19, 16, 0.45)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "marquee": "marquee 32s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
