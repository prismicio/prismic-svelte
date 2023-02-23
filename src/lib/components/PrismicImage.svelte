<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	export let field: prismicT.ImageField;

	let className: string;

	// creates a `class` property, even
	// though it is a reserved word
	export { className as class };
</script>

{#if prismicH.isFilled.image(field)}
	{@const { alt, dimensions } = field}
	{@const { width, height } = dimensions}
	{@const { src, srcset } = prismicH.asImageWidthSrcSet(field)}

	<img {src} {srcset} {alt} {width} {height} class={className} />
{:else}
	<img alt={field.alt || ""} class={className} />
{/if}
