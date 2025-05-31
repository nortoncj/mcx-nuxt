/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue", 
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue"
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('daisyui')
    ],
    daisyui: {
      themes: [
        {
          MCX: {
            "primary": "oklch(60% 0.245 78.834)",
            "secondary": "oklch(20% 0.109 3.907)", 
            "accent": "oklch(35% 0.188 13.697)",
            "neutral": "oklch(14% 0.005 285.823)",
            "base-100": "oklch(98% 0 0)",
            "base-200": "oklch(95% 0 0)",
            "base-300": "oklch(92% 0 0)",
            "info": "oklch(40% 0.17 325.612)",
            "success": "oklch(76% 0.177 163.223)",
            "warning": "oklch(60% 0.245 78.834)",
            "error": "oklch(45% 0.188 13.697)",
          }
        },
        "light",
        "dark"
      ]
    }
  }