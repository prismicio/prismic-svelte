import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import type { PrismicConfig } from "./types";

const configurePrismic = (config: PrismicConfig): any => {
	const endpoint = prismic.getEndpoint(config.repoName);
	const client = (fetch: any) => prismic.createClient(endpoint, fetch);

	return Object.assign(prismicH);
};

export default configurePrismic;
