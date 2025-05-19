/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        backgroundZoom: 'backgroundZoom 6s ease-in-out infinite alternate',
        gradientShift: 'gradientShift 6s ease infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        popIn: 'popIn 0.6s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        backgroundZoom: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.04)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
