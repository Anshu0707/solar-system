/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "glow-indigo": "0 0 10px 2px rgba(99, 102, 241, 0.6)",
      },
      colors: {
        space: "#0b0c10",
        planetGlow: "#00f7ff",
        sunCore: "#ffae00",
      },
    },
  },
  plugins: [],
};
