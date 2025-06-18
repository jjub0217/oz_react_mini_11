/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        neodung: ['"NeoDunggeunmo"', "sans-serif"], // ✅ 사용자 폰트 등록
        Pixgamer: ['"Pixgamer"', "sans-serif"], // ✅ 사용자 폰트 등록
      },
    },
  },
  plugins: [],
};
