import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
	globalIgnores(["build", ".react-router"]),
	{
		files: ["**/*.{ts,tsx}"],
		plugins: { js },
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
		},
	},
	reactRefresh.configs.vite,
]);
