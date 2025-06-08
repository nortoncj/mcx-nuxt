// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				modules: ["@nuxt/eslint", "@nuxt/icon"],
				devtools: { enabled: true },
				css: [
								"~/assets/css/reset.css",
				],
				compatibilityDate: "2025-05-15",
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