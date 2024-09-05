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
      keyframes: {
        spin89345: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        pulse0112: {
          "0%, 100%": { transform: "scale(0)", opacity: "0.5" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        spin89345: "spin89345 1s linear infinite",
        pulse0112: "pulse0112 calc(0.9s * 1.111) ease-in-out infinite",
      },
    },
    screens: {
      sm: "386px",
      // => @media (min-width: 640px) { ... }

      md: "650px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1171px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
