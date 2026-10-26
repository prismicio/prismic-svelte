import { resolve } from "$app/paths"
import * as prismic from "@prismicio/client"
import type { Cookies } from "@sveltejs/kit"

import { getSafePath } from "../lib/getSafePath"

export type RedirectToPreviewURLConfig = {
	/** The Prismic client configured for the preview session's repository. */
	// `Pick` is used to use the smallest possible subset of
	// `prismic.Client`. Doing this reduces the surface area for breaking
	// type changes.
	client: Pick<prismic.Client, "resolvePreviewURL">

	/**
	 * The `request` object from a `+server` file.
	 *
	 * @see SvelteKit `+server` docs: \<https://svelte.dev/docs/kit/routing#server\>
	 */
	request: Request

	/**
	 * The `cookies` object from a `+server` file.
	 *
	 * @see SvelteKit `+server` docs: \<https://svelte.dev/docs/kit/routing#server\>
	 */
	cookies: Cookies

	/** The default redirect URL if a URL cannot be determined for the previewed document. */
	defaultURL?: string

	/** The route parameter prefixed during preview sessions. */
	routePrefix?: string
}

/**
 * Redirects a visitor to the URL of a previewed Prismic document from within a SvelteKit `+server`
 * file.
 *
 * Return the created `Response` in your `+server` file.
 *
 * @example
 * 	```typescript
 * 	import { createClient } from "#lib/prismicio.ts"
 * 	import { redirectToPreviewURL } from "@prismicio/svelte/kit"
 *
 * 	export async function GET({ fetch, request, cookies }) {
 * 		const client = createClient({ fetch })
 *
 * 		return await redirectToPreviewURL({ client, request, cookies })
 * 	}
 * 	```
 */
export const redirectToPreviewURL = async (
	config: RedirectToPreviewURLConfig,
): Promise<Response> => {
	const previewToken = new URL(config.request.url).searchParams.get("token") ?? undefined
	const documentID = new URL(config.request.url).searchParams.get("documentId") ?? undefined
	const routePrefix = config.routePrefix ?? "preview"

	const location =
		getSharedPath(config.request.url, routePrefix) ??
		"/" +
			routePrefix +
			(await config.client.resolvePreviewURL({
				previewToken,
				documentID,
				defaultURL: config.defaultURL || "/",
			}))

	// Prevent a flash of non-preview content by setting the preview token
	// on the initial page load.
	if (previewToken) {
		config.cookies.set(prismic.cookie.preview, previewToken, {
			path: "/",
			httpOnly: false,
		})
	}

	// The toolbar's `v=5` flow follows the preview session with this cookie.
	const session = new URL(config.request.url).searchParams.get("session")
	if (session) {
		config.cookies.set(prismic.cookie.previewSession, session, {
			path: "/",
			httpOnly: false,
		})
	}

	return new Response(undefined, {
		status: 307,
		headers: {
			Location: location,
		},
	})
}

/**
 * Returns the `path` param of toolbar share links inside the preview route prefix, or `undefined`
 * if it is missing or not a path on this website.
 */
const getSharedPath = (requestURL: string, routePrefix: string): string | undefined => {
	const path = getSafePath(new URL(requestURL).searchParams.get("path"))
	// `path` comes from the browser, so it already includes `paths.base`. `resolve()` returns `base`
	// either absolute or relative to the request.
	const base = new URL(resolve("/", {}), requestURL).pathname.slice(0, -1)
	const rest = path?.startsWith(base) ? path.slice(base.length) : undefined
	// `/docs` and `/docs?q=1` are under the `/docs` base, but `/docs-old` isn't.
	if (rest === undefined || !/^([/?#]|$)/.test(rest)) {
		return
	}

	return /^\/([^/?#]*)/.exec(rest)?.[1] === routePrefix ? path : `${base}/${routePrefix}${rest}`
}
