<script lang="ts">
	import TodoSliceComponent from "./TodoSliceComponent.svelte";

	import type * as prismicT from "@prismicio/types";
	import type { SvelteComponent } from "svelte";

	type SliceComponents = Record<
		string,
		new (...args: any[]) => SvelteComponent
	>;

	/**
	 * The minimum required properties to represent a Prismic Slice from the
	 * Prismic Rest API V2 for the `<SliceZone>` component.
	 *
	 * If using Prismic's Rest API V2, use the `Slice` export from
	 * `@prismicio/types` for a full interface.
	 *
	 * @typeParam SliceType - Type name of the Slice.
	 */
	type SliceLikeRestV2<SliceType extends string = string> = {
		slice_type: prismicT.Slice<SliceType>["slice_type"];
	};

	/**
	 * The minimum required properties to represent a Prismic Slice from the
	 * Prismic GraphQL API for the `<SliceZone>` component.
	 *
	 * @typeParam SliceType - Type name of the Slice.
	 */
	type SliceLikeGraphQL<SliceType extends string = string> = {
		type: prismicT.Slice<SliceType>["slice_type"];
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
	type SliceLike<SliceType extends string = string> =
		| SliceLikeRestV2<SliceType>
		| SliceLikeGraphQL<SliceType>;

	/**
	 * An array of Prismic Slices, such as the `slices` property from a Prismic document.
	 */
	export let slices: SliceLike[] = [];

	/**
	 * An object that maps Slice components to their corresponding API IDs
	 *
	 * @example An example map:
	 *
	 * ```js
	 * import BlockQuote from "./BlockQuote.svelte";
	 * import HeroImage from "./HeroImage.svelte";
	 *
	 * const components = {
	 * 	block_quote: BlockQuote,
	 * 	hero_image: HeroImage,
	 * };
	 * ```
	 */
	export let components: SliceComponents = {};

	/**
	 * Arbitrary data passed to all Slice components as a `context` prop.
	 */
	export let context: any = {};

	/**
	 * The Svelte component rendered if a component mapping from the `components`
	 * prop cannot be found.
	 */
	export let defaultComponent:
		| SvelteComponent
		| (new (...args: any[]) => SvelteComponent)
		| undefined = undefined;

	/**
	 * Whether the app is in development mode. When true, the SliceZone may
	 * display error messages in the UI.
	 */
	export let dev: boolean = false;
</script>

<!-- 
  @component
  Component to render an array of Prismic Slices.
  
  @example Rendering a Rich Text field:
	```svelte
		<SliceZone slices={document.data.slices} components={{
			block_quote: BlockQuote,
			hero_image: HeroImage
		}} />
  ```
-->

{#each slices as slice, index}
	{@const type = "slice_type" in slice ? slice.slice_type : slice.type}
	{@const Component = components[type] || defaultComponent}
	{#if Component}
		<svelte:component this={Component} {slice} {slices} {context} {index} />
	{:else}
		<TodoSliceComponent {slice} {dev} />
	{/if}
{/each}
