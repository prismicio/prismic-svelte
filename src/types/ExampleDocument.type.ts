import type * as prismicT from "@prismicio/types";

export type ExampleDocument = prismicT.PrismicDocument<{
	example_link: prismicT.LinkField;
	example_content_relationship: prismicT.ContentRelationshipField;
	example_image: prismicT.ImageField;
}>;
