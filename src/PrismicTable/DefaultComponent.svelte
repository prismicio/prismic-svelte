<script lang="ts">
	import type { Snippet } from "svelte";

	import type { TableComponents } from "../types";

	type Props = {
		type: keyof TableComponents;
		children?: Snippet;
	};

	const { type, children }: Props = $props();
</script>

<svelte:element this={type}>{@render children?.()}</svelte:element>
