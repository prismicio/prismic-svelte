<script lang="ts">
	import type { RichTextNodeType } from "@prismicio/client";
	import type { asTree } from "@prismicio/richtext";

	import type { SvelteRichTextSerializer } from "../types";

	import DefaultComponent from "./DefaultComponent.svelte";

	export let components: SvelteRichTextSerializer = {};
	export let children: ReturnType<typeof asTree>["children"];

	const rewrittenNodeTypes: Partial<
		Record<
			(typeof RichTextNodeType)[keyof typeof RichTextNodeType],
			keyof typeof RichTextNodeType
		>
	> = {
		"list-item": "listItem",
		"o-list-item": "oListItem",
		"group-list-item": "list",
		"group-o-list-item": "oList",
	};
</script>

{#each children as child}
	<svelte:component
		this={components[rewrittenNodeTypes[child.type] || child.type] ||
			DefaultComponent}
		node={child.node}
		key={child.key}
	>
		{#if child.children.length > 0}
			<svelte:self children={child.children} {components} />
		{/if}
	</svelte:component>
{/each}
