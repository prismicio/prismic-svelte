<script lang="ts">
	import { setContext } from "svelte";

	import { prismicKey } from "./injectionSymbols";
	import { PrismicContext } from "./types";

	// export let client: PrismicContext["client"] = undefined;
	// export let linkResolver: PrismicContext["linkResolver"] = undefined;
	// export let htmlSerializer: PrismicContext["htmlSerializer"] = undefined;
	export let prismic = {
		client: undefined,
		linkResolver: undefined,
		prismic: undefined,
		htmlSerializer: undefined,
		slices: undefined,
	};

	setContext<PrismicContext>(prismicKey, {
		client: prismic.client,
		linkResolver: prismic.linkResolver,
		htmlSerializer: prismic.htmlSerializer,
		slices: prismic.slices
	});
</script>

<slot />
