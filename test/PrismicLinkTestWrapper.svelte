<!--
This file is a wrapper for the PrismicLink component to be used in tests as
passing slot content to the PrismicLink component is not easy in tests.
-->

<script lang="ts">
	import type { FilledLinkToWebField } from "@prismicio/client";

	import { PrismicLink } from "../src";

	type Props = {
		field: FilledLinkToWebField;
		children?: string;
	};

	const { field, children }: Props = $props();
</script>

{#if children}
	<PrismicLink {field}>{children}</PrismicLink>
{:else}
	<PrismicLink {field} />
{/if}
