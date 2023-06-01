/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: "Dancing Script",
        
      },
      colors: {
        bg_body: "#fff7f7",
      },

      screens: {
        s: "600px",
        // => @media (min-width: 6000px) { ... }
        xs: "480px",
        // => @media (min-width: 480px) { ... }
        xxs: "360px",
        // => @media (min-width: 360px) { ... }
      },
    },
  },
  plugins: [],
};
