/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: '#ffffff',
        secondaryBackground: 'rgb(17, 24, 39)',
        primaryText: 'rgb(17, 24, 39)',
        secondaryText: '#ffffff',
        accent: '#1e90ff',
      },
      boxShadow: {
        'custom-light': '0 2px 6px 10px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};