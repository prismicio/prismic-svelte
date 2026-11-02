import { fileURLToPath } from "node:url"

import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [svelte()],
	test: {
		typecheck: {
			enabled: true,
		},
		coverage: {
			provider: "v8",
			reporter: ["lcovonly", "text"],
			include: ["src"],
		},
		setupFiles: ["./test/__setup__.ts"],
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ["browser"],
				// SvelteKit provides `$app/*` modules at build time.
				alias: {
					"$app/navigation": fileURLToPath(
						new URL("./test/__mocks__/navigation.ts", import.meta.url),
					),
				},
			}
		: undefined,
})
