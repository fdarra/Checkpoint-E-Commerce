/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '960px',
    //   xl: '1200px',
    // },
    extend: {
      backgroundImage: {
       
        BackImg:'url("../public/maingb.jpg")',
        BackImg2:'url("../public/page4.jpg")',
      },


    },
  },
  plugins: [],
}