import { ClientConfig } from "@prismicio/client";
import { Cookies } from "@sveltejs/kit";

/**
 * Configuration for creating a Prismic client with automatic preview support in
 * SvelteKit apps.
 */
export type CreateClientConfig = ClientConfig & {
	/**
	 * The `cookies` object provided to a route's `load()` function. This
	 * parameter is required to load previews.
	 */
	cookies?: Cookies;
};
