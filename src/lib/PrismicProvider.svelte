<script lang="ts">
	import { setContext } from "svelte";

	import { prismicKey } from "./injectionSymbols";
	import { PrismicContext } from "./types";

	export let client: PrismicContext["client"] = undefined;
	export let linkResolver: PrismicContext["linkResolver"] = undefined;
	export let htmlSerializer: PrismicContext["htmlSerializer"] = undefined;

	setContext<PrismicContext>(prismicKey, {
		client,
		linkResolver,
		htmlSerializer,
	});
</script>

<slot />
