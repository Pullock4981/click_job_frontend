/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
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
          "primary": "#5BADE3",
          "secondary": "#1E293B",
          "accent": "#5BADE3",
          "neutral": "#334155",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
          "base-300": "#334155",
          "base-content": "#F8FAFC",
          "info": "#3abff8",
          "success": "#22c55e",
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

