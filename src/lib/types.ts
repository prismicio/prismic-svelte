import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

export type PrismicContext = {
	client?: prismic.Client;
	linkResolver?: prismicH.LinkResolverFunction;
	htmlSerializer?: prismicH.HTMLFunctionSerializer | prismicH.HTMLMapSerializer;
};
