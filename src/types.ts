import type {
	RTAnyNode,
	RichTextNodeType,
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

export type SvelteRichTextSerializer = Partial<
	Record<
		keyof typeof RichTextNodeType,
		Component<{
			node?: RTAnyNode;
			children?: Snippet;
		}>
	>
>;

// Define the type for the components prop
export type TableComponents = {
	table?: Component<{
		table: TableField<"filled">;
		children?: Snippet;
	}>;
	thead?: Component<{
		head: TableFieldHead;
		children?: Snippet;
	}>;
	tbody?: Component<{
		body: TableFieldBody;
		children?: Snippet;
	}>;
	tr?: Component<{
		row: TableFieldHeadRow | TableFieldBodyRow;
		children?: Snippet;
	}>;
	th?: Component<{
		cell: TableFieldHeaderCell;
		children?: Snippet;
	}>;
	td?: Component<{
		cell: TableFieldDataCell;
		children?: Snippet;
	}>;
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
