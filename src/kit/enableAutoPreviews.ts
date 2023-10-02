import * as prismic from "@prismicio/client";
import { Cookies } from "@sveltejs/kit";

/**
 * Configuration for `enableAutoPreviews`.
 */
export type EnableAutoPreviewsConfig = {
	/**
	 * Prismic client with which automatic previews will be enabled.
	 */
	// `Pick` is used to use the smallest possible subset of `Client`. Doing
	// this reduces the surface area for breaking type changes.
	client: Pick<prismic.Client, "queryContentFromRef">;

	/**
	 * The `cookies` object provided to a route's `load()` function. This parmeter
	 * is required to load previews.
	 */
	cookies?: Cookies;
};

export const enableAutoPreviews = (config: EnableAutoPreviewsConfig): void => {
	if (!config.cookies) {
		return;
	}

	const cookie = config.cookies.get(prismic.cookie.preview);

	// We only return the cookie if a Prismic Preview session is active.
	//
	// An inactive cookie looks like this (URL encoded):
	// 	{
	// 		"_tracker": "abc123"
	// 	}
	//
	// An active cookie looks like this (URL encoded):
	// 	{
	// 		"_tracker": "abc123",
	// 		"example-prismic-repo.prismic.io": {
	// 			preview: "https://example-prismic-repo.prismic.io/previews/abc:123?websitePreviewId=xyz"
	// 		}
	// 	}
	if (cookie && /\.prismic\.io/.test(cookie)) {
		config.client.queryContentFromRef(cookie);
	}
};
