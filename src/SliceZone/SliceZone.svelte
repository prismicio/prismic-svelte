<script lang="ts">
	import type { Component } from "svelte";

	import type { SliceComponentProps, SliceZoneLike } from "../types";

	import TodoComponent from "./TodoComponent.svelte";

	type Props = {
		/**
		 * An array of Prismic Slices, such as the `slices` property from a Prismic
		 * document.
		 */
		slices?: SliceZoneLike;

		/**
		 * An object that maps Slice components to their corresponding API IDs.
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		components?: Record<string, Component<any>>;

		/**
		 * Arbitrary data passed to all Slice components as a `context` prop.
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		context?: any;

		/**
		 * The Svelte component rendered if a component mapping from the
		 * `components` prop cannot be found.
		 */
		defaultComponent?: Component<SliceComponentProps> | undefined;
	};

	const {
		slices = [],
		components = {},
		context = {},
		defaultComponent = undefined,
	}: Props = $props();
</script>

<!--
  @component
  Component to render an array of Prismic slices.

  @example Rendering a Slice Zone:
	```svelte
		<SliceZone
			slices={document.data.slices}
			components={{
				block_quote: BlockQuote,
				hero_image: HeroImage
			}}
		/>
	```
-->

{#each slices as slice, index ("id" in slice && slice.id ? slice.id : `${index}-${JSON.stringify(slice)}`)}
	{@const type = "slice_type" in slice ? slice.slice_type : slice.type}
	{@const Component = components[type] || defaultComponent}
	{#if Component}
		{#if slice.__mapped}
			{@const { __mapped, ...mappedProps } = slice}
			<Component {...mappedProps} />
		{:else}
			<Component {slice} {slices} {context} {index} />
		{/if}
	{:else}
		<TodoComponent {slice} />
	{/if}
{/each}
