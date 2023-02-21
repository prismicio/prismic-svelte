import type * as prismicT from "@prismicio/types";

export interface CodeSnippetSlice extends prismicT.Slice {
	primary: {
		content: prismicT.RichTextField;
	};
}
