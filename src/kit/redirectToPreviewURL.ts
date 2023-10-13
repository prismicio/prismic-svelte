import * as prismic from "@prismicio/client";
import { Cookies } from "@sveltejs/kit";

export type RedirectToPreviewURLConfig = {
	/**
	 * The Prismic client configured for the preview session's repository.
	 */
	// `Pick` is used to use the smallest possible subset of
	// `prismic.Client`. Doing this reduces the surface area for breaking
	// type changes.
	client: Pick<prismic.Client, "resolvePreviewURL">;

	/**
	 * The `request` object from a `+server` file.
	 *
	 * @see SvelteKit `+server` docs: \<https://kit.svelte.dev/docs/routing#server\>
	 */
	request: Request;

	/**
	 * The `cookies` object from a `+server` file.
	 *
	 * @see SvelteKit `+server` docs: \<https://kit.svelte.dev/docs/routing#server\>
	 */
	cookies: Cookies;

	/**
	 * The default redirect URL if a URL cannot be determined for the previewed
	 * document.
	 */
	defaultURL?: string;

	/**
	 * The route parameter prefixed during preview sessions.
	 */
	routePrefix?: string;
};

/**
 * Redirects a visitor to the URL of a previewed Prismic document from within a
 * SvelteKit `+server` file.
 *
 * Return the created `Response` in your `+server` file.
 *
 * @example
 *
 * ```typescript
 * import { createClient } from "$lib/prismicio.js";
 * import { redirectToPreviewURL } from "@prismicio/svelte/kit";
 *
 * export async function GET({ fetch, request }) {
 * 	const client = createClient({ fetch });
 *
 * 	return await redirectToPreviewURL({ client, request });
 * }
 * ```
 */
export const redirectToPreviewURL = async (
	config: RedirectToPreviewURLConfig,
): Promise<Response> => {
	const previewToken =
		new URL(config.request.url).searchParams.get("token") ?? undefined;
	const documentID =
		new URL(config.request.url).searchParams.get("documentId") ?? undefined;
	const routePrefix = config.routePrefix ?? "preview";

	const previewURL = await config.client.resolvePreviewURL({
		previewToken,
		documentID,
		defaultURL: config.defaultURL || "/",
	});

	// Prevent a flash of non-preview content by setting the preview token
	// on the initial page load.
	if (previewToken) {
		config.cookies.set(prismic.cookie.preview, previewToken, {
			path: "/",
			httpOnly: false,
		});
	}

	return new Response(undefined, {
		status: 307,
		headers: {
			Location: "/" + routePrefix + previewURL,
		},
	});
};
