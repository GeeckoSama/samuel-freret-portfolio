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
          primary: "#252c31",
          secondary: "#14399f",
          accent: "#738ee8",
          neutral: "#1d2b30",
          "base-100": "#f5f8f9",
          "base-200": "#edf1f2",
          "base-300": "#e6ebed",
        },
        dark: {
          primary: "#ced5da",
          secondary: "#6085eb",
          accent: "#17328c",
          neutral: "#1d2b30",
          "base-100": "#06090a",
          "base-200": "#151c1e",
          "base-300": "#192023",
        },
      },
    ],
  },
  plugins: [daisyui],
};
