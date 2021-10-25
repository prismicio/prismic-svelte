import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
// import type { PrismicConfig } from "./types";

const configurePrismic = (globalOptions: any): any => {
	const endpoint = prismic.getEndpoint(globalOptions?.repositoryName);
	const client = prismic.createClient(endpoint, globalOptions);
	const withFetch = () =>
		prismic.createClient(endpoint, { ...globalOptions, fetch });
	Object.assign(client, { withFetch });

	return { ...prismicH, client };
};

export default configurePrismic;
