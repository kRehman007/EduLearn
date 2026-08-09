/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#6d5ae6",
          dark: "#5a47d6",
          light: "#eeebff",
        },
        accent: {
          DEFAULT: "#e91367",
          dark: "#c60e57",
          light: "#fdeaf3",
        },
        surface: "#ffffff",
        appbg: "#f6f7fb",
        ink: {
          DEFAULT: "#1e293b",
          muted: "#64748b",
        },
      },
    },
  },
  plugins: [],
};
