const { transform } = require('next/dist/build/swc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  theme: {
    screens: {
      'rg': '350px'
    },
    extend: {
      transform: ["hover", "focus"],
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "move": {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }, 
        }
      },
      animation: {
        "move": "move 10s linear infinite",
      }
    },
    colors: {
      "background": "#F6F7FB",
      "navbar" : '#181818',
      "card" : '#1E1E1E',
      "link" : '#FFD700',
      "white" : '#FFF',
      "black" : '#000',
      "btnWhite" : '#D9D9D9',
      "green" : '#54C541',
      'texttime' : '#4C4C4C',
      "header" : "#33363F",
      "gold" : "#F4BE37",
      "blue" : "#3F56FF",
      "gray" : "#AFAFAF",
      "yellow" : "#F4BE37",
      "grayText" : "#959595",
    },
    
  },
  darkMode: "class",
  plugins: [],
};
