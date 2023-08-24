<script lang="ts">
	import type { EmbedField } from "@prismicio/client";
	import { isFilled } from "@prismicio/client";

	/**
	 * An Embed field from Prismic.
	 */
	export let field: EmbedField;
</script>

<!--
  @component
  Component to render a Prismic Embed field.

  @example Rendering an Embed field:
	```svelte
		<PrismicEmbed field={document.data.example_embed} />
  ```
-->

{#if isFilled.embed(field)}
	<div
		data-oembed={field.embed_url}
		data-oembed-type={field.type}
		data-oembed-provider={field.provider_name}
	>
		{@html field.html}
	</div>
{/if}
