<script lang="ts">
	import { onMount } from "svelte";
	import { getToolbarSrc } from "@prismicio/client";
	import { invalidateAll } from "$app/navigation";

	/**
	 * The name of your Prismic repository. A Prismic Toolbar will be registered
	 * using this repository.
	 */
	export let repositoryName: string;

	$: toolbarSrc = getToolbarSrc(repositoryName);

	function prismicPreviewEventHandler(event: Event) {
		event.preventDefault();

		invalidateAll();
	}

	onMount(() => {
		window.addEventListener("prismicPreviewUpdate", prismicPreviewEventHandler);
		window.addEventListener("prismicPreviewEnd", prismicPreviewEventHandler);

		return () => {
			window.removeEventListener(
				"prismicPreviewUpdate",
				prismicPreviewEventHandler,
			);
			window.removeEventListener(
				"prismicPreviewEnd",
				prismicPreviewEventHandler,
			);
		};
	});
</script>

<svelte:head>
	<script defer src={toolbarSrc}></script>
</svelte:head>
