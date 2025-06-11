// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
	{
		plugins: {},
		rules: {
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
			"@typescript-eslint/consistent-type-imports": "error",
			"import/order": ["error", { "alphabetize": { "order": "asc" } }],
			"quotes": ["error", "double"],
			"semi": ["error", "always"],
			"indent": ["error", "tab"]
		}
	}
]);
