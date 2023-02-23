import * as prismic from "@prismicio/client";
import type { PageDocument } from "../types/PageDocument.type"
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const endpoint = prismic.getRepositoryEndpoint("svelte-package-dev");
	const client = prismic.createClient(endpoint, { fetch });

	const document: PageDocument = await client.getSingle("homepage");

	return {
		document,
	};
// eslint-disable-next-line prettier/prettier
}) satisfies PageServerLoad;
