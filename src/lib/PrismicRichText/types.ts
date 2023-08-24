import type { RichTextNodeType, RTAnyNode } from "@prismicio/client";
import type { SvelteComponent } from "svelte";

export type SvelteRichTextMapSerializer = Partial<
	Record<
		keyof typeof RichTextNodeType,
		typeof SvelteComponent<
			Partial<{
				node: RTAnyNode;
			}>
		>
	>
>;
