import type { RTAnyNode, RichTextNodeType } from "@prismicio/client";
import type { SvelteComponent } from "svelte";

export type SvelteRichTextSerializer = Partial<
	Record<keyof typeof RichTextNodeType, SvelteRichTextComponent>
>;

type SvelteRichTextComponent = new (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	...args: any[]
) => SvelteComponent<
	Partial<{
		node: RTAnyNode;
	}>
>;
