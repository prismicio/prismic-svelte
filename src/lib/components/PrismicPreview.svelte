<script lang="ts">
	import * as prismic from "@prismicio/client";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	export let linkResolver: any;
	export let defaultURL: string;
	export let client: any;

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const previewToken = urlParams.get("token");
		const documentID = urlParams.get("documentId");
		if (documentID && previewToken) {
			const redirect = await client.resolvePreviewURL({
				documentID,
				defaultURL,
				previewToken,
				linkResolver,
			});
			await goto(redirect);
			return;
		}
		console.log("Could not resolve preview URL.");
		// TODO: Handle else
	});
</script>

<slot />
