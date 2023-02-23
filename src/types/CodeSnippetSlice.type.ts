import type * as prismicT from "@prismicio/types";

type PrimaryFields = {
	content: prismicT.RichTextField;
};

export type CodeSnippetSlice = prismicT.Slice<"code_snippet", PrimaryFields>;
