<script lang="ts">
	import type { Snippet } from "svelte";

	import type { ComponentShorthand, TableComponents } from "../types";

	type Props = {
		type?: keyof TableComponents;
		children: Snippet;
		shorthand?: ComponentShorthand;
	};

	const { type, children, shorthand }: Props = $props();

	const as = $derived(shorthand?.as ?? type);

	const attrs = $derived.by(() => {
		const { as: _, ...attrs } = shorthand ?? {};
		return attrs;
	});
</script>

<svelte:element this={as} {...attrs}>{@render children()}</svelte:element>
