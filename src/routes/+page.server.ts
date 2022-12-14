import * as prismic from "@prismicio/client";
import type * as prismicT from "@prismicio/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const endpoint = prismic.getEndpoint("svelte-package-dev");
	const client = prismic.createClient(endpoint, { fetch });

	const document: prismicT.PrismicDocument = await client.getSingle("homepage");

	return {
		document,
	};
}) satisfies PageServerLoad; // eslint-disable-line
