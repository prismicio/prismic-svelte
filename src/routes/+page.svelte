<script lang="ts">
	import { SliceZone, PrismicLink, PrismicRichText } from "$lib";
	import { RichText, CodeSnippet } from "./slices";

	import type { PageData } from "./$types";

	const components = {
		rich_text: RichText,
		code_snippet: CodeSnippet,
	};

	export let data: PageData;
</script>

<main>
	<SliceZone slices={data.pageDocument.data.body} {components} />
	<h1>Welcome to SvelteKit</h1>
	<h2>Prismic Rich Text</h2>
	<PrismicRichText field={data.exampleDocument.data.example_rich_text} />
	<h2>Prismic Link</h2>
	<PrismicLink
		data-sveltekit-noscroll
		data-sveltekit-preload-code
		data-sveltekit-preload-data
		data-sveltekit-reload
		rel="external"
		class="doggo"
		field={data.exampleDocument.data.example_link}>Link</PrismicLink
	>
	<h2>Slice Zone</h2>
</main>

<style>
	main {
		max-width: min(90%, 800px);
		margin: auto;
	}
</style>
