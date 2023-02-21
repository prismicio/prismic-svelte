<script lang="ts">
	import { SliceZone } from "$lib";
	import { RichText, CodeSnippet } from "$lib/slices";
	import type { PageData } from "./../types/PageData.type";

	const components = {
		rich_text: RichText,
		code_snippet: CodeSnippet,
	};

	export let data: PageData;
</script>

<main>
	<h1>Welcome to SvelteKit</h1>
	<SliceZone slices={data.document.data.body} {components} />
</main>

<style>
	main {
		max-width: min(90%, 800px);
		margin: auto;
	}
</style>
