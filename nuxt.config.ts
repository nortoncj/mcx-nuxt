// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
																modules: ["@nuxt/eslint", "@nuxt/icon", "@pinia/nuxt"],
																devtools: { enabled: true },
																css: [
																																"~/assets/css/reset.css",
																],
				compatibilityDate: "2025-05-15",
				runtimeConfig: {
								//server-side only
								privateKey: 'secretKey',
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