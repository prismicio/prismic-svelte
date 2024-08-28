<script lang="ts">
	// This file is a wrapper for the PrismicLink component to be used in tests as
	// passing slot content to the PrismicLink component is not easy in tests.

	import { FilledLinkToWebField } from "@prismicio/client";

	type $$Props = {
		field: FilledLinkToWebField;
		children?: string;
	};

	export let field: $$Props["field"];
	export let children: $$Props["children"] = undefined;

	import { PrismicLink } from "../src";
</script>

{#if children}
	<PrismicLink {field}>
		{children}
	</PrismicLink>
{:else}
	<PrismicLink {field} />
{/if}
