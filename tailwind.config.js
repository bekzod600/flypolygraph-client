/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-black": "#17212B",
        "c-white": "#ffffff",
        "c-primary": "#F8A917",
        "c-green": "#31B545",
        "c-danger": "#E64D44",
        "c-text": "#6AB2D4",
        "c-text-hover": "#5A92A4",
      },
      aspectRatio: {
        mobile: "3 / 4",
      },
    },
  },
  plugins: [],
};
