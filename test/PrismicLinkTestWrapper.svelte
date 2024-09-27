<!--
This file is a wrapper for the PrismicLink component to be used in tests as
passing slot content to the PrismicLink component is not easy in tests.
-->

<script lang="ts">
	import { FilledLinkToWebField } from "@prismicio/client";
	import { PrismicLink } from "../src";

	export let field: FilledLinkToWebField;
	export let children: string | undefined = undefined;
</script>

{#if children}
	<PrismicLink {field}>{children}</PrismicLink>
{:else}
	<PrismicLink {field} />
{/if}
