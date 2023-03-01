<script lang="ts">
	import type { RichTextSlice } from "./../../../types/RichTextSlice.type";
	import PrismicRichText from "$lib/components/PrismicRichText/PrismicRichText.svelte";
	import Emphasis from "./../../components/Emphasis.svelte";

	export let slice: RichTextSlice;
</script>

<PrismicRichText field={slice.primary.content} components={{ em: Emphasis }} />
