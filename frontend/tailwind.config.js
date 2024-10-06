/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
    keyframes: {
      bounceIn: {
        '0%': { transform: 'scale(0)', opacity: 0 },
        '50%': { transform: 'scale(1.2)', opacity: 0.7 },
        '100%': { transform: 'scale(1)', opacity: 1 },
      },
    },
    animation: {
      'bounce-in': 'bounceIn 1.5s ease-in-out',
    },
  },
  plugins: [],
}
