import type { Route } from "./Route.type";

export interface PrismicConfig {
	repoName: string;
	routes?: Route[];
	accessToken?: string;
	options?: null;
}
