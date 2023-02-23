<script lang="ts">
<<<<<<< HEAD
	import * as prismicH from "@prismicio/helpers"
	import type * as prismicT from "@prismicio/types";
	
	export let field: prismicT.ImageField;
	
=======
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	export let field: prismicT.ImageField;

	let className: string;

>>>>>>> master
	// creates a `class` property, even
	// though it is a reserved word
	let className: string;
	export { className as class };
<<<<<<< HEAD

	if(!prismicH.isFilled.image(field)) {
		console.warn("Invalid prop")
	}
=======
>>>>>>> master
</script>

{#if prismicH.isFilled.image(field)}
	{@const { alt, dimensions } = field}
<<<<<<< HEAD
	{@const { width, height } = dimensions }
=======
	{@const { width, height } = dimensions}
>>>>>>> master
	{@const { src, srcset } = prismicH.asImageWidthSrcSet(field)}

	<img {src} {srcset} {alt} {width} {height} class={className} />
{:else}
	<img alt={field.alt || ""} class={className} />
<<<<<<< HEAD
{/if}
=======
{/if}
>>>>>>> master
