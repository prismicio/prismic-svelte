import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		coverage: {
			provider: "c8",
			reporter: ["lcovonly", "text"],
		},
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
