/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["CabinetGrotesk-Variable", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1a1a1a",
          "primary-content": "#cbcbcb",
          secondary: "#a5f3fc",
          "secondary-content": "#0a1416",
          accent: "#a7f3d0",
          "accent-content": "#0a1410",
          neutral: "#1a1a1a",
          "neutral-content": "#cbcbcb",
          "base-100": "#f7f7f7",
          "base-200": "#d7d7d7",
          "base-300": "#b7b7b7",
          "base-content": "#151515",
          info: "#a5f3fc",
          "info-content": "#0a1416",
          success: "#4ade80",
          "success-content": "#021206",
          warning: "#fbbf24",
          "warning-content": "#150d00",
          error: "#ef4444",
          "error-content": "#140202",
        },
      },
      "dark",
    ],
  },
  plugins: [daisyui],
};
