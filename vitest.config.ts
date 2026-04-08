import { defineConfig } from "vitest/config";

import { svelte } from "@sveltejs/vite-plugin-svelte";

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
			}
		: undefined,
});
