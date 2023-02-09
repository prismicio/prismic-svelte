import * as prismic from "@prismicio/client";
import type * as prismicT from "@prismicio/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const tutorialEndpoint = prismic.getEndpoint("svelte-package-dev");
	const tutorialClient = prismic.createClient(tutorialEndpoint, { fetch });

	const tutorialDocument: prismicT.PrismicDocument = await tutorialClient.getSingle("homepage");

	const exampleEndpoint = prismic.getEndpoint("example-prismic-repo")
	const exampleClient = prismic.createClient(exampleEndpoint, {fetch})
	const exampleDocument: prismicT.PrismicDocument = (await exampleClient.getByType("example_custom_type", {
		page: 12,
		pageSize: 1
	})).results[0]

	return {
		tutorialDocument,
		exampleDocument
	};
// eslint-disable-next-line prettier/prettier
}) satisfies PageServerLoad;
