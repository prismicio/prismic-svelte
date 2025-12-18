import type {
	RTAnyNode,
	RTEmNode,
	RTEmbedNode,
	RTHeading1Node,
	RTHeading2Node,
	RTHeading3Node,
	RTHeading4Node,
	RTHeading5Node,
	RTHeading6Node,
	RTImageNode,
	RTLabelNode,
	RTLinkNode,
	RTListItemNode,
	RTListNode,
	RTOListItemNode,
	RTOListNode,
	RTParagraphNode,
	RTPreformattedNode,
	RTSpanNode,
	RTStrongNode,
	RichTextNodeTypes,
	Slice,
	TableField,
	TableFieldBody,
	TableFieldBodyRow,
	TableFieldDataCell,
	TableFieldHead,
	TableFieldHeadRow,
	TableFieldHeaderCell,
} from "@prismicio/client";
import type { Component, Snippet } from "svelte";

/** A shorthand definition for `<PrismicRichText />` and `<PrismicTable />` component types. */
export type ComponentShorthand = {
	/** The HTML element type rendered for this node type. */
	as?: string

	/** Other attributes to apply to the element type. */
	[Attribute: string]: string | boolean | null | undefined
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSvelteComponent = <T extends Record<string, any>>(
	component: Component<T> | ComponentShorthand | undefined
): component is Component<T> => {
	return typeof component === "function";
};

export type RichTextComponents = {
	heading1?: RichTextComponent<RTHeading1Node> | ComponentShorthand;
	heading2?: RichTextComponent<RTHeading2Node> | ComponentShorthand;
	heading3?: RichTextComponent<RTHeading3Node> | ComponentShorthand;
	heading4?: RichTextComponent<RTHeading4Node> | ComponentShorthand;
	heading5?: RichTextComponent<RTHeading5Node> | ComponentShorthand;
	heading6?: RichTextComponent<RTHeading6Node> | ComponentShorthand;
	paragraph?: RichTextComponent<RTParagraphNode> | ComponentShorthand;
	preformatted?: RichTextComponent<RTPreformattedNode> | ComponentShorthand;
	strong?: RichTextComponent<RTStrongNode> | ComponentShorthand;
	em?: RichTextComponent<RTEmNode> | ComponentShorthand;
	listItem?: RichTextComponent<RTListItemNode> | ComponentShorthand;
	oListItem?: RichTextComponent<RTOListItemNode> | ComponentShorthand;
	list?: RichTextComponent<RTListNode> | ComponentShorthand;
	oList?: RichTextComponent<RTOListNode> | ComponentShorthand;
	image?: RichTextComponent<RTImageNode> | ComponentShorthand;
	embed?: RichTextComponent<RTEmbedNode> | ComponentShorthand;
	hyperlink?: RichTextComponent<RTLinkNode> | ComponentShorthand;
	label?: RichTextComponent<RTLabelNode> | ComponentShorthand;
	span?: RichTextComponent<RTSpanNode> | ComponentShorthand;
};

export type RichTextComponent<TNode extends RTAnyNode = RTAnyNode> = Component<
	RichTextComponentProps<TNode>
>

export type RichTextComponentProps<TNode extends RTAnyNode = RTAnyNode> = {
	node: TNode;
	children: Snippet;
};

export type InternalRichTextComponents = Record<RichTextNodeTypes, {
	is: Component<
		RichTextComponentProps<RTAnyNode> &
		{ shorthand?: ComponentShorthand }
	>,
	shorthand?: ComponentShorthand;
} | { is: RichTextComponent, shorthand?: never }>

// Define the type for the components prop
export type TableComponents = {
	table?: Component<{
		table: TableField<"filled">;
		children: Snippet;
	}> | ComponentShorthand;
	thead?: Component<{
		head: TableFieldHead;
		children: Snippet;
	}> | ComponentShorthand;
	tbody?: Component<{
		body: TableFieldBody;
		children: Snippet;
	}> | ComponentShorthand;
	tr?: Component<{
		row: TableFieldHeadRow | TableFieldBodyRow;
		children: Snippet;
	}> | ComponentShorthand;
	th?: Component<{
		cell: TableFieldHeaderCell;
		children: Snippet;
	}> | ComponentShorthand;
	td?: Component<{
		cell: TableFieldDataCell;
		children: Snippet;
	}> | ComponentShorthand;
};

/**
 * Props for a component rendering content from a Prismic Slice using the
 * `<SliceZone>` component.
 *
 * @typeParam TSlice - The Slice passed as a prop.
 * @typeParam TContext - Arbitrary data passed to `<SliceZone>` and made
 *   available to all Slice components.
 */
export type SliceComponentProps<
	TSlice extends SliceLike = SliceLike,
	TContext = unknown,
> = {
	/**
	 * Slice data for this component.
	 */
	slice: TSlice;

	/**
	 * The index of the Slice in the Slice Zone.
	 */
	index: number;

	/**
	 * All Slices from the Slice Zone to which the Slice belongs.
	 */
	// TODO: We have to keep this list of Slices general due to circular
	// reference limtiations. If we had another generic to determine the full
	// union of Slice types, it would include TSlice. This causes TypeScript to
	// throw a compilation error.
	slices: SliceZoneLike<
		TSlice extends SliceLikeGraphQL ? SliceLikeGraphQL : SliceLikeRestV2
	>;

	/**
	 * Arbitrary data passed to `<SliceZone>` and made available to all Slice
	 * components.
	 */
	context: TContext;
};

/**
 * The minimum required properties to represent a Prismic Slice from the Prismic
 * Rest API V2 for the `<SliceZone>` component.
 *
 * If using Prismic's Rest API V2, use the `Slice` export from
 * `@prismicio/types` for a full interface.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
type SliceLikeRestV2<SliceType extends string = string> = {
	slice_type: Slice<SliceType>["slice_type"];
};

/**
 * The minimum required properties to represent a Prismic Slice from the Prismic
 * GraphQL API for the `<SliceZone>` component.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
type SliceLikeGraphQL<SliceType extends string = string> = {
	type: Slice<SliceType>["slice_type"];
};

/**
 * The minimum required properties to represent a Prismic Slice for the
 * `<SliceZone>` component.
 *
 * If using Prismic's Rest API V2, use the `Slice` export from
 * `@prismicio/types` for a full interface.
 *
 * @typeParam SliceType - Type name of the Slice.
 */
type SliceLike<SliceType extends string = string> = (
	| SliceLikeRestV2<SliceType>
	| SliceLikeGraphQL<SliceType>
) & {
	/**
	 * If `true`, this Slice has been modified from its original value using a
	 * mapper and `@prismicio/client`'s `mapSliceZone()`.
	 *
	 * @internal
	 */
	__mapped?: true;
};

/**
 * A looser version of the `SliceZone` type from `@prismicio/client` using
 * `SliceLike`.
 *
 * If using Prismic's Rest API V2, use the `SliceZone` export from
 * `@prismicio/client` for the full type.
 *
 * @typeParam TSlice - The type(s) of a Slice in the Slice Zone.
 */
export type SliceZoneLike<TSlice extends SliceLike = SliceLike> =
	readonly TSlice[];
