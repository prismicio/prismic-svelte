<script lang="ts">
	import { asTree } from "@prismicio/richtext";
	import type { RichTextField } from "@prismicio/client";

	import type { SvelteRichTextSerializer } from "../types";

	import Serialize from "./Serialize.svelte";

	/**
	 * The Prismic rich text field to render.
	 */
	export let field: RichTextField;

	/**
	 * An object that maps a rich text block type to a Svelte component.
	 */
	export let components: SvelteRichTextSerializer = {};

	$: children = asTree(field).children;
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
