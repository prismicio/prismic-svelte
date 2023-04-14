<script lang="ts">
	import { PrismicRichText } from "$lib";
	import type { RichTextSlice } from "../../types";
	import Emphasis from "../components/Emphasis.svelte";

	export let slice: RichTextSlice;
</script>

<PrismicRichText
	field={slice.primary.content}
	components={{ em: () => Emphasis }}
/>
