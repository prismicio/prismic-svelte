<script lang="ts">
	import type { EmbedField } from "@prismicio/client";
	import { isFilled } from "@prismicio/client";

	type Props = {
		/**
		 * An Embed field from Prismic.
		 */
		field: EmbedField;
	};

	const { field }: Props = $props();
</script>

<!--
  @component
  Component to render a Prismic embed field.

  @example Rendering an embed field:
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
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html field.html}
	</div>
{/if}
