import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
	globalIgnores(["build", ".react-router"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [tseslint.configs.recommended, reactRefresh.configs.vite],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
		},
	},
]);
