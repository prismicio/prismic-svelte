<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type { CodeSnippetSlice } from "../../../types/CodeSnippetSlice.type";

	export let slice: CodeSnippetSlice;
</script>

<pre>
  {@html prismicH.asHTML(slice.primary.content)}
</pre>

<style>
	pre {
		background: #222;
		color: white;
		padding: 10px;
		border-radius: 10px;
	}
</style>
