import type { RTAnyNode, RichTextNodeType } from "@prismicio/client";
import type { ComponentType, SvelteComponent } from "svelte";

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

// Define the type for the components prop
export type TableComponents = {
	table?: ComponentType;
	thead?: ComponentType;
	tbody?: ComponentType;
	tr?: ComponentType;
	th?: ComponentType;
	td?: ComponentType;
};
