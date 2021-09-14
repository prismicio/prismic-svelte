import svelte from "rollup-plugin-svelte";

import { defineSirocConfig } from "siroc";

export default defineSirocConfig({
	rollup: {
		plugins: [svelte()],
	},
	// hooks: {
	// 	"build:extendRollup": {
	// 		plugins: [
	// 			svelte({
	// 				compilerOptions: {
	// 					// enable run-time checks when not in production
	// 					dev: !production,
	// 				},
	// 			}),
	// 		],
	// 	},
	// },
});
