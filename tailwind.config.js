/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'thumb': 'var(--active-tab-marker)',
        'track': 'var(--panel-header-background)',
        'green': 'var(--button-secondary)',
        'green-hover': 'var(--button-secondary-hover)',
        'gray': 'var(--background-default-active)',
        'input': 'var(--avatar-circle-gray-dark)'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

