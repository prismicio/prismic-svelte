import * as prismic from "@prismicio/client";
import type { PageData } from "./../types/PageData.type"
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const endpoint = prismic.getEndpoint("svelte-package-dev");
	const client = prismic.createClient(endpoint, { fetch });

	const document: PageData = await client.getSingle("homepage");

	return {
		document,
	};
// eslint-disable-next-line prettier/prettier
}) satisfies PageServerLoad;
