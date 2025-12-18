<script lang="ts">
	import type { asTree } from "@prismicio/client/richtext";

	import type { InternalRichTextComponents } from "../types";

	import Serialize from "./Serialize.svelte";

	type Props = {
		internalComponents: InternalRichTextComponents;
		children: ReturnType<typeof asTree>["children"];
	};

	const { internalComponents, children }: Props = $props();
</script>

{#each children as child (child.key)}
	{@const Component = internalComponents[child.type].is}
	{@const shorthand = internalComponents[child.type].shorthand}
	<Component node={child.node} {shorthand}>
		<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
		{#if child.children.length > 0}<Serialize
				children={child.children}
				{internalComponents}
			/>{/if}</Component
	>
{/each}
