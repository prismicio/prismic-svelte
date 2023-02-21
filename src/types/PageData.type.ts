import type * as prismicT from "@prismicio/types";
import type { CodeSnippetSlice } from "./CodeSnippetSlice.type";
import type { RichTextSlice } from "./RichTextSlice.type";

export interface PageData extends prismicT.PrismicDocument {
	document: {
		data: {
			body: [CodeSnippetSlice | RichTextSlice];
		};
	};
}
