/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // src 내부 컴포넌트들
    "./pages/**/*.{js,ts,jsx,tsx}", // Next.js인 경우
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js app router인 경우
  ],
  darkMode: "class", // ✅ 이걸 추가해야 버튼으로 테마 전환이 가능!
  theme: {
    extend: {},
  },
  plugins: [],
};
