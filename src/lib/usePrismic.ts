interface PrismicConfig {
	repoName: string;
	routes: [
		{
			type: string;
			path: string;
			uid?: string;
			resolvers?: {
				[key: ?string]: string;
			};
		},
	];
	accessToken: string;
	options: null;
}

const usePrismic = (config: PrismicConfig): any => {
	return {
		asHTML: null,
		asText: null,
		client: null,
		predicate: null,
		asLink: null,
		documentAsLink: null,
		asDate: null,
	};
};

export default usePrismic;
