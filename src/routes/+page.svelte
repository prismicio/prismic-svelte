<script lang="ts">
	import {
		SliceZone,
		PrismicLink,
		PrismicImage,
		PrismicRichText,
		PrismicText,
		PrismicEmbed,
	} from "$lib";
	import { RichText, CodeSnippet } from "./slices";

	import type { PageData } from "./$types";
	import { page } from "$app/stores";

	const components = {
		rich_text: RichText,
		code_snippet: CodeSnippet,
	};

	export let data: PageData;
</script>

<main>
	<h2>PrismicText</h2>
	<PrismicText field={data.exampleDocument.data.example_rich_text} />
	<SliceZone slices={data.pageDocument.data.body} {components} />
	<h1>Welcome to SvelteKit</h1>
	<h2>Prismic Rich Text</h2>
	<PrismicRichText field={data.exampleDocument.data.example_rich_text} />
	<h2><code>PrismicImage</code></h2>
	<PrismicImage
		field={data.exampleDocument.data.example_image}
		pixelDensities="defaults"
		height="200px"
		alt=""
	/>
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

	:global(img) {
		width: auto;
		height: auto;
	}
</style>
