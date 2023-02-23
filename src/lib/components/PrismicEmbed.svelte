<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	export let field: prismicT.EmbedField;

	if (!prismicH.isFilled.embed(field)) {
		console.warn("Invalid prop");
	}
</script>

{#if prismicH.isFilled.embed(field)}
	{@html field.html}
{/if}
