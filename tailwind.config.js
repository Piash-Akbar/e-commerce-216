/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./src/**/*.js", // adjust this path if needed
    ],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-fancy': "linear-gradient(270deg, #ff6ec4, #7873f5, #4ADEDE, #C4FCEF)",
        },
        animation: {
          'gradient-x': 'gradient-x 8s ease infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
          },
        },
      },
    },
    plugins: [],
  };
  
export default config;