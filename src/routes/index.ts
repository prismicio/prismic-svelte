import * as prismic from "@prismicio/client";
import type * as prismicT from "@prismicio/types";

export async function get({ fetch }) {
	const endpoint = prismic.getEndpoint("svelte-package-dev");
	const client = prismic.createClient(endpoint, { fetch });

	const document: prismicT.PrismicDocument = await client.getSingle("homepage");

	return {
		body: {
			document,
		},
	};
}
