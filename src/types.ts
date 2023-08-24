import type { RTAnyNode, RichTextNodeType } from "@prismicio/client";
import type { SvelteComponent } from "svelte";

export type SvelteRichTextSerializer = Partial<
	Record<
		keyof typeof RichTextNodeType,
		typeof SvelteComponent<
			Partial<{
				node: RTAnyNode;
			}>
		>
	>
>;
