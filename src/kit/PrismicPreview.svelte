<script lang="ts">
	import { beforeNavigate, goto, invalidateAll } from "$app/navigation";
	import { getToolbarSrc } from "@prismicio/client";
	import { onMount } from "svelte";

	type Props = {
		/**
		 * The name of your Prismic repository. A Prismic Toolbar will be registered
		 * using this repository.
		 */
		repositoryName: string;

		/**
		 * The route parameter prefixed during preview sessions.
		 */
		routePrefix?: string;

		/**
		 * The name of the preview-specific route parameter prefixed during preview
		 * sessions.
		 *
		 * Only set this value if the route parameter's name differs from the
		 * parameter's value.
		 */
		routePrefixName?: string;
	};

	const {
		repositoryName,
		routePrefix = "preview",
		routePrefixName = routePrefix,
	}: Props = $props();

	const toolbarSrc = $derived(getToolbarSrc(repositoryName));

	/**
	 * Set to `true` when the next `beforeNavigate()` call should not prefix the
	 * route.
	 */
	let endingPreview = $state(false);

	// Register Prismic toolbar event handlers to refresh data on content updates.
	onMount(() => {
		const controller = new AbortController();

		window.addEventListener(
			"prismicPreviewUpdate",
			(event) => {
				event.preventDefault();
				invalidateAll();
			},
			{ signal: controller.signal },
		);
		window.addEventListener(
			"prismicPreviewEnd",
			(event) => {
				event.preventDefault();

				endingPreview = true;

				goto(
					new URL(
						window.location.pathname.replace(
							new RegExp(`^(/${routePrefix}/?$|/${routePrefix}/)`),
							"/",
						),
						window.location.origin,
					),
					{
						invalidateAll: true,
						noScroll: true,
					},
				);
			},
			{ signal: controller.signal },
		);

		return () => {
			controller.abort();
		};
	});

	beforeNavigate((navigation) => {
		// Prefix links with the preview route parameter if the current
		// route is in a preview session.
		if (
			navigation.to &&
			navigation.from?.params?.[routePrefixName] === routePrefix &&
			!(routePrefixName in (navigation.to.params || {}))
		) {
			// If this callback is called due to a `prismicPreviewEnd`
			// event, don't prefix the route. The exception is only
			// valid for one call.
			if (endingPreview) {
				endingPreview = false;
				return;
			}

			navigation.cancel();
			goto(
				new URL(
					routePrefix + navigation.to.url.pathname,
					navigation.to.url.origin,
				),
			);
		}
	});
</script>

<svelte:head>
	<script defer src={toolbarSrc}></script>
</svelte:head>
