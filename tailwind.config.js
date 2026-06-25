/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
      },
      colors: {
        ink: "#0e0e10",
        paper: "#fafaf9",
        accent: "#a3e635",
      },
    },
  },
  plugins: [],
};
