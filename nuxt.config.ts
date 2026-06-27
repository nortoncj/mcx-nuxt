// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: "MCX",
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/pwa-512x512.png",
				}
			],
		},
	},
	pages: true,
	modules: [
		"@nuxt/eslint",
		"@nuxt/icon",
		"@pinia/nuxt",
		"nuxt-lodash",
		"pinia-plugin-persistedstate/nuxt",
		"@pinia/nuxt",
		"@vite-pwa/nuxt",
	],
	// pwa: {
	// 	manifest: {
	// 		name: "Magna Carda Exchange",
	// 		short_name: "MCX",
	// 		description: "Start building your empire with Magna Carda Exchange.",
	// 		theme_color: "#ffffff",
	// 		background_color: "#131313",
	// 		display: "standalone",
	// 		start_url: "/",
	// 		icons: [
	// 			{
	// 				src: "/pwa-192x192.png",
	// 				sizes: "192x192",
	// 				type: "image/png",
	// 			},
	// 			{
	// 				src: "/pwa-512x512.png",
	// 				sizes: "512x512",
	// 				type: "image/png",
	// 			},
	// 		]
	// 	},
	// 	devOptions: {
	// 		enabled: true, // Enable PWA in development mode
	// 		type: "module", // Use module type for service worker
	// 	},
	// },
	
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
			API_URL: process.env.API_URL || "http://localhost:8000/api",
			APP_BASE_URL: process.env.APP_BASE_URL || "http://localhost:8000",
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