/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        base: { light: "#F7F7F7", dark: "#1A1A1A" },
        primary: { light: "#1A1A1A", dark: "#F7F7F7" },
        accent: { light: "#b5e3d8", dark: "#89c1b2" },
        danger: { light: "#ffa4a4", dark: "#ff8c8c" },
        success: { light: "#98e5b0", dark: "#7bc79c" },
      },
      fontFamily: {
        sans: ["CabinetGrotesk-Variable", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [daisyui],
};
