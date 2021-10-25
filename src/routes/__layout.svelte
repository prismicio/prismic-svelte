<script context="module" lang="ts">
	import { PrismicProvider } from "$lib"; // @prismicio/svelte in production
	import prismic from "./prismic";

	// Make client and helpers available server-side
	export function load() {
		return {
			stuff: {
				prismic
			}
		}
	}
</script>

<PrismicProvider {prismic}>
	<slot />
</PrismicProvider>
