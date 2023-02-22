import type * as prismicT from "@prismicio/types";
import type { CodeSnippetSlice } from "./CodeSnippetSlice.type";
import type { RichTextSlice } from "./RichTextSlice.type";

export type PageDocument = prismicT.PrismicDocument<{
	body: prismicT.SliceZone<CodeSnippetSlice | RichTextSlice>;
}>;
