<script lang="ts">
	import { asTree } from "@prismicio/richtext";
	import type { RichTextField } from "@prismicio/client";

	import type { SvelteRichTextMapSerializer } from "./types";
	import Serialize from "./Serialize.svelte";

	/**
	 * The Prismic Rich Text field to render.
	 */
	export let field: RichTextField;

	/**
	 * An object that maps a Rich Text block type to a Svelte component.
	 */
	export let components: SvelteRichTextMapSerializer = {};

	$: children = asTree(field).children;
</script>

<Serialize {children} {components} />
