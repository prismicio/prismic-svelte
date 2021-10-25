import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
// import type { PrismicConfig } from "./types";

interface globalOptions {
	repositoryName: string,
	htmlSerializer?: any,
	linkResolver?: any,
	routes?: any,
	slices?: any,
}

const configurePrismic = (globalOptions: globalOptions): any => {
	const {
		repositoryName,
		htmlSerializer,
		linkResolver,
		slices
	} = globalOptions;
	const endpoint = prismic.getEndpoint(repositoryName);
	const client = prismic.createClient(endpoint, globalOptions);
	const clientWithFetch = () =>
		prismic.createClient(endpoint, { ...globalOptions, fetch });

	return { ...prismicH,
		client,
		clientWithFetch,
		htmlSerializer,
		linkResolver,
		slices,
	};
};

export default configurePrismic;
