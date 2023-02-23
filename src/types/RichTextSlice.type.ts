import type * as prismicT from "@prismicio/types";

type PrimaryFields = {
	content: prismicT.RichTextField;
};

export type RichTextSlice = prismicT.Slice<"rich_text", PrimaryFields>;
