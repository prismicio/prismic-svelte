<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type { RichTextSlice } from "./../../../types/RichTextSlice.type";

	export let slice: RichTextSlice;
</script>

{@html prismicH.asHTML(slice.primary.content)}
