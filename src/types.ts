import type * as prismic from "@prismicio/client";
import type { Component, ComponentType, SvelteComponent } from "svelte";

export type SvelteRichTextSerializer = {
	heading1?: ComponentCompat<{ node: prismic.RTHeading1Node }>;
	heading2?: ComponentCompat<{ node: prismic.RTHeading2Node }>;
	heading3?: ComponentCompat<{ node: prismic.RTHeading3Node }>;
	heading4?: ComponentCompat<{ node: prismic.RTHeading4Node }>;
	heading5?: ComponentCompat<{ node: prismic.RTHeading5Node }>;
	heading6?: ComponentCompat<{ node: prismic.RTHeading6Node }>;
	paragraph?: ComponentCompat<{ node: prismic.RTParagraphNode }>;
	preformatted?: ComponentCompat<{ node: prismic.RTPreformattedNode }>;
	strong?: ComponentCompat<{ node: prismic.RTStrongNode }>;
	em?: ComponentCompat<{ node: prismic.RTEmNode }>;
	listItem?: ComponentCompat<{ node: prismic.RTListItemNode }>;
	oListItem?: ComponentCompat<{ node: prismic.RTOListItemNode }>;
	list?: ComponentCompat<{ node: prismic.RTListNode }>;
	oList?: ComponentCompat<{ node: prismic.RTOListNode }>;
	image?: ComponentCompat<{ node: prismic.RTImageNode }>;
	embed?: ComponentCompat<{ node: prismic.RTEmbedNode }>;
	hyperlink?: ComponentCompat<{ node: prismic.RTLinkNode }>;
	label?: ComponentCompat<{ node: prismic.RTLabelNode }>;
	span?: ComponentCompat<{ node: prismic.RTSpanNode }>;
};

// Define the type for the components prop
export type TableComponents = {
	table?: ComponentTypeCompat<{ table: prismic.TableField<"filled"> }>;
	thead?: ComponentTypeCompat<{ head: prismic.TableFieldHead }>;
	tbody?: ComponentTypeCompat<{ body: prismic.TableFieldBody }>;
	tr?: ComponentTypeCompat<{
		row: prismic.TableFieldHeadRow | prismic.TableFieldBodyRow;
	}>;
	th?: ComponentTypeCompat<{ table: prismic.TableFieldHeaderCell }>;
	td?: ComponentTypeCompat<{ table: prismic.TableFieldDataCell }>;
};

// Compatibility type helpers for better compatibility with Svelte 4 and 5.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentTypeCompat<Props extends Record<string, any> = any> =
	| Component<Props>
	| ComponentType<SvelteComponent<Props>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentCompat<Props extends Record<string, any> = any> =
	| Component<Props>
	| (new (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			...args: any[]
	  ) => SvelteComponent<Partial<Props>>);
