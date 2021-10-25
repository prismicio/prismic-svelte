import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
// import type { PrismicConfig } from "./types";

interface globalOptions {
	endpoint: string,
	htmlSerializer?: any,
	linkResolver?: any,
	routes?: any,
	fetch?: any,
	slices?: any,
}

const configurePrismic = (globalOptions: globalOptions): any => {
	const endpoint = prismic.getEndpoint(globalOptions?.repositoryName);
	const client = prismic.createClient(endpoint, globalOptions);
	const clientWithFetch = () =>
		prismic.createClient(endpoint, { ...globalOptions, fetch });

	return { ...prismicH, client, clientWithFetch };
};

export default configurePrismic;
