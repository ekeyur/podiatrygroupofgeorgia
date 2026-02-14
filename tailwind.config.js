/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f6f7",
          100: "#dde7ea",
          200: "#bdd0d5",
          300: "#96b4bc",
          400: "#5E8D97",
          500: "#4e7780",
          600: "#416169",
          700: "#384f55",
          800: "#2d3f44",
          900: "#1a272b",
          950: "#111c1f",
        },
        gold: {
          50: "#fdf8ee",
          100: "#f8eed2",
          200: "#f0dba2",
          300: "#e7c36a",
          400: "#D4A843",
          500: "#c49230",
          600: "#a67524",
          700: "#895a20",
          800: "#714821",
          900: "#5e3c1f",
        },
        cream: {
          50: "#FEFCF8",
          100: "#FBF7EE",
          200: "#F5EDDC",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};
