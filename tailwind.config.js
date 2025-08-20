/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./domains/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "white-gradient": `linear-gradient(360.58deg, #FFFFFF 43.76%, rgba(255, 255, 255, 0) 106.82%)`,
      },
      fontFamily: {
        primary: "Manrope",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      fontStyle: {
        italic: "italic", // Add "italic" style to the font family
      },
      // ✅ semantic colors backed by CSS vars
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        page: "rgb(var(--page) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)",

        // your existing brand tokens (unchanged)
        gray: {
          600: "#2C2C2C",
          700: "#242424",
          800: "#1A1A1A",
          900: "#121212",
        },
        purple: {
          DEFAULT: "#7b3fe4",
          400: "#8852e6",
          500: "#7b3fe4",
          600: "#6e38cd",
          700: "#6232b6",
          800: "#562c9f",
        },
        "template-black": "#121212",
        "template-white": "#F3F1EA",
        "template-yellow": "#FFBA21",
        "template-green": "#56BC78",
        "template-orange": "#FF5722",
        "template-red": "#DF1D00",
      },
      screens: {
        "2xs": "360px",
        xs: "420px",
        "3xl": "2160px",
        "4xl": "3000px",
      },
    },
  },
  plugins: [],
};
