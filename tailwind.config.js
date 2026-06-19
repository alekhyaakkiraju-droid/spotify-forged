/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        navBar: "280px",
        topBar: "60px",
        nowPlayingBar: "72px",
      },
      colors: {
        spotify: {
          green: "rgb(var(--text-primary) / <alpha-value>)",
          black: "rgb(var(--background-baseline) / <alpha-value>)",
          highlight: "rgb(var(--background-highlight) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
