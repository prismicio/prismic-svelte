import * as prismic from "@prismicio/client";
import type { PageDocument } from "../types/PageDocument.type"
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const endpoint = prismic.getRepositoryEndpoint("svelte-package-dev");
	const client = prismic.createClient(endpoint, { fetch });

	const pageDocument: PageDocument = await client.getSingle("homepage");

	const exampleClient = prismic.createClient("example-prismic-repo", { fetch })
	const exampleDocument = exampleClient.getFirst()


	return {
		pageDocument,
		exampleDocument
	};
// eslint-disable-next-line prettier/prettier
}) satisfies PageServerLoad;
