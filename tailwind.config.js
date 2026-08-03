/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        navBar: "280px",
        topBar: "64px",
        nowPlayingBar: "90px",
      },
      colors: {
        spotify: {
          green: "rgb(var(--text-primary) / <alpha-value>)",
          black: "rgb(var(--background-baseline) / <alpha-value>)",
          elevated: "rgb(var(--background-elevated) / <alpha-value>)",
          highlight: "rgb(var(--background-highlight) / <alpha-value>)",
          card: "rgb(var(--background-card) / <alpha-value>)",
        },
      },
      boxShadow: {
        card: "0 8px 24px rgba(0, 0, 0, 0.5)",
        glow: "0 0 40px rgba(29, 185, 84, 0.15)",
      },
    },
  },
  plugins: [],
};
