// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
		"@nuxt/icon",
		"@pinia/nuxt",
		"nuxt-lodash",
		"pinia-plugin-persistedstate/nuxt",
		"@pinia/nuxt",
		"@vite-pwa/nuxt",
	],
	pwa: {
		manifest: {
			name: "My Nuxt ",
			short_name: "NuxtApp",
			description: "A Nuxt.js application with PWA support",
			theme_color: "#ffffff",
			background_color: "#ffffff",
			display: "standalone",
			start_url: "/",
			icons: [
				{
					src: "/icon-192x192.png",
					sizes: "192x192",
					type: "image/png",
				},
				{
					src: "/icon-512x512.png",
					sizes: "512x512",
					type: "image/png",
				},
			]
		},
		devOptions: {
			enabled: true, // Enable PWA in development mode
			type: "module", // Use module type for service worker
		},
	},
	
	experimental: {
		payloadExtraction: false, // Disable payload extraction for performance
	},
	devtools: { enabled: true },
	css: [
		"~/assets/css/reset.css",
	],
	compatibilityDate: "2025-05-15",
	runtimeConfig: {
		// server-side only
		privateKey: "secretKey",
		public: {
			API_URL: process.env.API_URL || "http://localhost:3000/api",
			APP_BASE_URL: process.env.APP_BASE_URL || "http://localhost:3000",
			APP_NAME: process.env.APP_NAME || "My Nuxt App",
		},
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
});

/*
pinia-plugin-persistedsate/nuxt
vite-pwa/nuxt
nuxt-icon
nuxt-lodash
pinia/nuxt : npm i pinia -f
axios
vue-advanced-cropper
tailwind *
*/