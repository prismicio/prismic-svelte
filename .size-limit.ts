import type { SizeLimitConfig } from "size-limit";

import { exports } from "./package.json";

module.exports = [
	{
		name: "@prismicio/svelte",
		path: exports["."].default,
		modifyEsbuildConfig,
	},
	{
		name: "@prismicio/svelte/kit",
		path: exports["./kit"].default,
		modifyEsbuildConfig,
	},
] satisfies SizeLimitConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function modifyEsbuildConfig(config: any) {
	config.platform = "node";

	// Add basic `*.svelte` support.
	config.loader = {
		...config.loader,
		".svelte": "text",
	};

	return config;
}
