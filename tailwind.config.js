export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#141517", // Varsayılan arka plan rengi
        text: "#E2E8F0", // Varsayılan metin rengi
      },
    },
  },
  plugins: [],
  darkMode: "class", // Dark mode'u devre dışı bırakır
};
