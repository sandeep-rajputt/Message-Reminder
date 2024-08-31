/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      maxWidth: {
        device: "1600px",
      },
      boxShadow: {
        "inner-border": "inset 0 0 0 0.5px #11111177",
        header: "0px 3px 5px 0px rgba(0, 0, 0, 0.2)",
        footer: "0px -1px 1px 0px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        "light-hover": "#F4F4F5",
        "dark-hover": "#122",
        dark: {
          DEFAULT: "#111",
          grey: "#495057",
        },
        "light-dark": {
          DEFAULT: "#333",
          grey: "#343a40",
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to right,  #181C27, #24293A)",
      },
    },
  },
  plugins: [],
};
