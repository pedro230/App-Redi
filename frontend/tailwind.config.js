/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'resi-emerald': '#0F6458',
        'resi-emerald-light': '#19A57A',
        'resi-sand': '#F5E6C5'
      }
    }
  },
  plugins: []
}
