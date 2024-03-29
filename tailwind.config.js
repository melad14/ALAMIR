/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5f4023',
        secondary: '#42362a',
      },
      boxShadow: {
        'md': '0 4px 6px 2px rgba(0, 0, 0, 0.7), 0 2px 4px 2px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
};
