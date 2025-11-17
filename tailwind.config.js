/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-red': '#E00000',
        'pure-black': '#000000',
        'pure-white': '#FFFFFF',
        'gray-bg': '#F5F5F5',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'hero': '0 0 50% 50% / 0 0 100px 100px',
        'footer': '50% 50% 0 0 / 100px 100px 0 0',
      },
    },
  },
  plugins: [],
}
