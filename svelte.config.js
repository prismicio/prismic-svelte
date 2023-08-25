import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// eslint-disable-next-line tsdoc/syntax
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
};

export default config;
