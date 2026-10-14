<!--
This file is a wrapper for the PrismicLink component to be used in tests as
passing slot content to the PrismicLink component is not easy in tests.
-->

<script lang="ts">
	import type { FilledLinkToWebField } from "@prismicio/client"

	import { PrismicLink } from "../src"

	const { field, children }: { field: FilledLinkToWebField; children?: string } = $props()
</script>

{#if children}
	<PrismicLink {field}>{children}</PrismicLink>
{:else}
	<PrismicLink {field} />
{/if}
