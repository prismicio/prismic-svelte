import * as prismic from "@prismicio/client";
import { redirect } from "@sveltejs/kit";

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
	 * The default redirect URL if a URL cannot be determined for the previewed
	 * document.
	 */
	defaultURL?: string;
};

/**
 * Redirects a visitor to the URL of a previewed Prismic document from within a
 * SvelteKit `+server` file.
 */
export const redirectToPreviewURL = async (
	config: RedirectToPreviewURLConfig,
): Promise<never> => {
	const previewToken =
		new URL(config.request.url).searchParams.get("token") ?? undefined;
	const documentID =
		new URL(config.request.url).searchParams.get("documentId") ?? undefined;

	const previewURL = await config.client.resolvePreviewURL({
		previewToken,
		documentID,
		defaultURL: config.defaultURL || "/",
	});

	throw redirect(307, previewURL);
};
