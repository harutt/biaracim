/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      maxWidth: {
        'container': '1440px', // Custom max-width like Turo
      },
      colors: {
        // Turo-inspired primary color palette
        primary: {
          DEFAULT: '#593CFB',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#593CFB', // Main Turo purple
          600: '#4c34d9',
          700: '#4027b8',
          800: '#351f96',
          900: '#2d1b7b',
        },
      },
    },
    container: {
      center: true,
      padding: '0',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
