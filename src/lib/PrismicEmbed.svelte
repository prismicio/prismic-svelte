<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	/**
	 * An Embed field from Prismic.
	 */
	export let field: prismicT.EmbedField;
</script>

<!-- 
  @component
  Component to render a Prismic Embed field.
  
  @example Rendering an Embed field:
	```svelte
		<PrismicEmbed field={document.data.example_embed} />
  ```
-->

{#if prismicH.isFilled.embed(field)}
	<div
		data-oembed={field.embed_url}
		data-oembed-type={field.type}
		data-oembed-provider={field.provider_name}
	>
		{@html field.html}
	</div>
{/if}
