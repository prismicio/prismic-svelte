import type {
	RTAnyNode,
	RichTextNodeType,
	TableField,
	TableFieldBody,
	TableFieldBodyRow,
	TableFieldDataCell,
	TableFieldHead,
	TableFieldHeadRow,
	TableFieldHeaderCell,
} from "@prismicio/client";
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
	table?: ComponentType<SvelteComponent<{ table: TableField<"filled"> }>>;
	thead?: ComponentType<SvelteComponent<{ head: TableFieldHead }>>;
	tbody?: ComponentType<SvelteComponent<{ body: TableFieldBody }>>;
	tr?: ComponentType<
		SvelteComponent<{ row: TableFieldHeadRow | TableFieldBodyRow }>
	>;
	th?: ComponentType<SvelteComponent<{ table: TableFieldHeaderCell }>>;
	td?: ComponentType<SvelteComponent<{ table: TableFieldDataCell }>>;
};
