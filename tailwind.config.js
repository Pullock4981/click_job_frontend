/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors (from image - 4 stripes)
        light: {
          primary: '#5BADE3',      // Sky Blue (Top)
          secondary: '#81D8BF',    // Seafoam/Teal (Second)
          accent: '#FED97D',       // Pale Yellow/Gold (Third)
          neutral: '#1E293B',      // Dark slate for readability
          base: '#F5F5F5',         // Very light grey/white (Bottom)
        },
        // Dark theme colors
        dark: {
          primary: '#37353E',
          secondary: '#44444E',
          accent: '#715A5A',
          neutral: '#D3DAD9',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#5BADE3",
          "secondary": "#81D8BF",
          "accent": "#FED97D",
          "neutral": "#1E293B",
          "base-100": "#F5F7FA",
          "base-200": "#EBEBEB",
          "base-300": "#E0E0E0",
          "base-content": "#1a1a1a",
          "info": "#5BADE3",
          "success": "#81D8BF",
          "warning": "#FED97D",
          "error": "#f87272",
        },
        dark: {
          "primary": "#5BADE3",      // Action blue
          "secondary": "#222133",    // For sidebar items
          "accent": "#5BADE3",       // Keeping matching accent
          "neutral": "#1E1D2B",
          "base-100": "#11101D",     // Very deep navy
          "base-200": "#1A1926",     // Main dark navy background
          "base-300": "#222133",     // For borders
          "base-content": "#FFFFFF",  // Pure white text
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
}

