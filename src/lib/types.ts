import type { Client } from "@prismicio/client";
import type {
	LinkResolverFunction,
	HTMLFunctionSerializer,
	HTMLMapSerializer,
} from "@prismicio/helpers";
// import type * as prismicH from "@prismicio/helpers";

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

export type PrismicContext = {
	client?: Client;
	linkResolver?: LinkResolverFunction;
	htmlSerializer?: HTMLFunctionSerializer | HTMLMapSerializer;
};
