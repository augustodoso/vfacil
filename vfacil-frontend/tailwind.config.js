/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        aurevixBlack: "#0A0A0A",
        aurevixDark: "#111111",
        aurevixGray: "#1A1A1A",
        aurevixBlue: "#3B82F6",
        aurevixBlueLight: "#60A5FA",
        aurevixBorder: "#2A2A2A",
      },
      boxShadow: {
        aurevix: "0 0 20px rgba(59,130,246,0.15)",
      }
    },
  },
  plugins: [],
};
