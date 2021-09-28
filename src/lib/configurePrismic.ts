import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
// import type { PrismicConfig } from "./types";

const configurePrismic = (globalOptions: any): any => {
	const createClient = (clientOptions: any) => {
		const options = Object.assign(globalOptions, clientOptions);
		const endpoint = prismic.getEndpoint(
			clientOptions.repositoryName || globalOptions.repositoryName,
		);

		return prismic.createClient(endpoint, options);
	};

	return { ...prismicH, createClient };
};

export default configurePrismic;
