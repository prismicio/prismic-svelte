<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	export let field: prismicT.EmbedField;
</script>

{#if prismicH.isFilled.embed(field)}
	{@html field.html}
{/if}
