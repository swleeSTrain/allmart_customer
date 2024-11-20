/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translate(-50%, -20px)', opacity: 0 },
          '100%': { transform: 'translate(-50%, 0)', opacity: 1 },
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
      }
    },
  },
  plugins: [],
}

