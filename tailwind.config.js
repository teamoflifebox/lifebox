 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js,jsx}"],
   theme: {
    extend: {
      keyframes: {
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(5px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
    },
  },
   plugins: [
    require('@tailwindcss/typography'),
  ]
 }