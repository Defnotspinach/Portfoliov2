/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '768px',
      'xl': '1024px',
    },
    extend: {
      colors: {
        'bg-primary': '#fafaf8',
        'text-primary': '#1a1a1a',
        'text-secondary': '#666',
        'text-muted': '#555',
        'border-light': '#e0e0e0',
        'bg-light': '#f0f0f0',
        'bg-subtle': '#f5f5f3',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

