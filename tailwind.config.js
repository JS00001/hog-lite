/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/ui/**/**/*.{js,jsx,ts,tsx}',
    './src/lib/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        highlight: 'var(--color-highlight)',
        divider: 'var(--color-divider)',
        red: 'var(--color-red)',
        yellow: 'var(--color-yellow)',
        blue: 'var(--color-blue)',
        green: 'var(--color-green)',
        gray: 'var(--color-gray)',
        'shadow-primary': 'var(--color-shadow-primary)',
        'shadow-accent': 'var(--color-shadow-accent)',
        'shadow-danger': 'var(--color-shadow-danger)',
        'border-danger': 'var(--color-border-danger)',
      },
    },
  },
  plugins: [],
};
