<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicR from "@prismicio/richtext";

	import type { RichTextField as RichTextFieldType } from "@prismicio/types";
	import type { TitleField as TitleFieldType } from "@prismicio/types";

	/**
	 * A Rich Text or Title field from Prismic.
	 */
	export let field: TitleFieldType | RichTextFieldType;

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

{@html prismicH.asText(field, separator)}
