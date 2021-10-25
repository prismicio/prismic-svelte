const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/components/image.svelte"),
	() => import("../../../src/routes/components/link.svelte"),
	() => import("../../../src/routes/preview.svelte"),
	() => import("../../../src/routes/slices/CodeSnippet.svelte"),
	() => import("../../../src/routes/slices/RichText.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/components/image.svelte
	[/^\/components\/image\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/components/link.svelte
	[/^\/components\/link\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/preview.svelte
	[/^\/preview\/?$/, [c[0], c[5]], [c[1]]],

	,

	,

	// src/routes/slices/CodeSnippet.svelte
	[/^\/slices\/CodeSnippet\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/slices/RichText.svelte
	[/^\/slices\/RichText\/?$/, [c[0], c[7]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];