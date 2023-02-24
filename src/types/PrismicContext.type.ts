import type { Client } from "@prismicio/client";
import type {
	LinkResolverFunction,
	HTMLFunctionSerializer,
	HTMLMapSerializer,
} from "@prismicio/helpers";
// import type * as prismicH from "@prismicio/helpers";

export type PrismicContext = {
	client?: Client;
	linkResolver?: LinkResolverFunction;
	htmlSerializer?: HTMLFunctionSerializer | HTMLMapSerializer;
};
