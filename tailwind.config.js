/** @type {import('tailwindcss').Config} */
module.exports = {
  // Chỉ định cho Tailwind áp dụng vào tất cả các file nằm trong thư mục src/
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
