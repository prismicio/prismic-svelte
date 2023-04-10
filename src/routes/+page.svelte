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
	<h1>Welcome to SvelteKit</h1>
	<h2><code>PrismicText</code></h2>
	<PrismicText field={data.exampleDocument.data.example_rich_text} />
	<h2><code>PrismicRichText</code></h2>
	<PrismicRichText field={data.exampleDocument.data.example_rich_text} />
	<h2><code>PrismicImage</code></h2>
	<PrismicImage
		field={data.exampleDocument.data.example_image}
		height="200"
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
		href="5"
		field={data.exampleDocument.data.example_link}>Link</PrismicLink
	>
	<h2><code>PrismicEmbed</code></h2>
	<PrismicEmbed field={data.exampleDocument.data.example_embed} />
	<h2><code>SliceZone</code></h2>
	<SliceZone slices={data.pageDocument.data.body} {components} />
</main>

<style>
	main {
		max-width: min(90%, 700px);
		margin: auto;
	}

	:global(img) {
		height: auto;
		max-width: 100%;
	}
</style>
