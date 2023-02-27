<script lang="ts">
	import { SliceZone, PrismicLink, PrismicImage } from "$lib";
	import { RichText, CodeSnippet } from "./slices";
	import type { PageData } from "./$types";

	const components = {
		rich_text: RichText,
		code_snippet: CodeSnippet,
	};

	export let data: PageData;
</script>

<main>
	<h1>Welcome to SvelteKit</h1>
	<h2><code>PrismicImage</code></h2>
	<PrismicImage field={data.exampleDocument.data.example_image} />
	<h2><code>PrismicLink</code></h2>
	<PrismicLink
		data-sveltekit-noscroll
		data-sveltekit-preload-code
		data-sveltekit-preload-data
		data-sveltekit-reload
		rel="external"
		class="doggo"
		field={data.exampleDocument.data.example_link}>Link</PrismicLink
	>
	<h2><code>SliceZone</code></h2>
	<SliceZone slices={data.pageDocument.data.body} {components} />
</main>

<style>
	main {
		max-width: min(90%, 800px);
		margin: auto;
	}
</style>
