/* eslint-disable tsdoc/syntax */
import preprocess from "svelte-preprocess";

/**
 * @type {import("@sveltejs/kit").Config}
 */
const config = {
	preprocess: preprocess(),
	kit: {
		package: {
			dir: "dist",
		},
	},
};

export default config;
