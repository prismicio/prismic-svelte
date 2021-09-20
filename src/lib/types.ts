export interface Route {
	/**
	 * The Custom Type of the document.
	 */
	type: string;
	/**
	 * The resolved path of the document with optional placeholders.
	 */
	path: string;
	/**
	 * An object that lists the API IDs of the Content Relationships in the route.
	 */
	resolvers: Record<string, string>;
}

export interface PrismicConfig {
	repoName: string;
	routes?: Route[];
	accessToken?: string;
	options?: null;
}
