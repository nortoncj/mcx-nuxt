/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "test-config": "#ff0000",
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        "MCX": {
          "primary": "#C4A100", // Imperial Gold
          "primary-content": "#F5F5F5", // Marble White
          "secondary": "#5A5A5A", // Gunmetal Gray
          "secondary-content": "#F5F5F5", // Marble White
          "accent": "#8B0000", // Crimson Velvet
          "accent-content": "#F5F5F5", // Marble White
          "neutral": "#121212", // Deep Onyx
          "neutral-content": "#F5F5F5", // Marble White
          "base-100": "#F5F5F5", // Roman Marble White
          "base-200": "#EEEEEE", // Lighter marble
          "base-300": "#DDDDDD", // Soft marble shadow
          "base-content": "#121212", // Deep Onyx Black
          "info": "#C4A100", // Imperial Gold
          "info-content": "#121212", // Deep Onyx
          "success": "#C4A100", // Gold for success
          "success-content": "#121212", // Deep Onyx
          "warning": "#C4A100", // Imperial Gold
          "warning-content": "#121212", // Deep Onyx
          "error": "#8B0000", // Crimson Velvet
          "error-content": "#F5F5F5", // Marble White
        },
        "MCX-Dark": {
          "primary": "#D4B100", // Brighter Imperial Gold
          "primary-content": "#121212", // Deep Onyx
          "secondary": "#6A6A6A", // Lighter Gunmetal
          "secondary-content": "#F5F5F5", // Marble White
          "accent": "#A00000", // Brighter Crimson
          "accent-content": "#F5F5F5", // Marble White
          "neutral": "#2A2A2A", // Lighter neutral
          "neutral-content": "#F5F5F5", // Marble White
          "base-100": "#121212", // Deep Onyx Black
          "base-200": "#1A1A1A", // Darker onyx
          "base-300": "#2A2A2A", // Gunmetal transition
          "base-content": "#F5F5F5", // Roman Marble White
          "info": "#D4B100", // Bright Imperial Gold
          "info-content": "#121212", // Deep Onyx
          "success": "#D4B100", // Bright Gold
          "success-content": "#121212", // Deep Onyx
          "warning": "#D4B100", // Bright Imperial Gold
          "warning-content": "#121212", // Deep Onyx
          "error": "#A00000", // Bright Crimson
          "error-content": "#F5F5F5", // Marble White
        },
      },
      "light",
      "dark",
    ],
  },
};
