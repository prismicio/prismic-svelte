<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	export let slice: prismicT.Slice;
</script>

{@html prismicH.asHTML(slice.primary.content)}
