<script lang="ts">
	import type { RichTextField } from "@prismicio/client";
	import { asText } from "@prismicio/client";

	/**
	 * A Rich Text or Title field from Prismic.
	 */
	export let field: RichTextField;

	/**
	 * The separator used between blocks. Defaults to `\n`.
	 */
	export let separator: string | undefined = undefined;
</script>

<!--
  @component
  Component to render a Prismic Rich Text or Title field as plain text.

  @example Rendering a Rich Text field:
	```svelte
		<PrismicText field={document.data.example_rich_text} />
  ```
-->

{asText(field, { separator })}
