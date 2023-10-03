import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/* eslint-disable tsdoc/syntax */
/**
 * @type {import("@sveltejs/kit").Config}
 */
/* eslint-enable tsdoc/syntax */
const config = {
	preprocess: vitePreprocess(),
};

export default config;
