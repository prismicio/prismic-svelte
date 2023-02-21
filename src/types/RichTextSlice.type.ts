import type * as prismicT from "@prismicio/types";

export interface RichTextSlice extends prismicT.Slice {
	primary: {
		content: prismicT.RichTextField;
	};
}
