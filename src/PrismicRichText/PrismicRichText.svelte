<script lang="ts">
	import type { RichTextField } from "@prismicio/client";
	import { asTree } from "@prismicio/client/richtext";

	import type { RichTextComponents } from "../types";

	import Serialize from "./Serialize.svelte";

	type Props = {
		/**
		 * The Prismic rich text field to render.
		 */
		field: RichTextField;

		/**
		 * An object that maps a rich text block type to a Svelte component.
		 */
		components?: RichTextComponents;
	};

	const { field, components = {} }: Props = $props();

	const children = $derived(asTree(field).children);
</script>

<!--
  @component
  Component to render a Prismic rich text field.

  @example Rendering a rich text field:
	```svelte
		<PrismicRichText field={document.data.example_rich_text} />
	```
-->

<Serialize {children} {components} />
