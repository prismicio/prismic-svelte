<script lang="ts">
	import type { asTree } from "@prismicio/richtext";

	import type { SvelteRichTextSerializer } from "../types";

	import DefaultComponent from "./DefaultComponent.svelte";

	export let components: SvelteRichTextSerializer = {};
	export let children: ReturnType<typeof asTree>["children"];

	const CHILD_TYPE_RENAMES = {
		"list-item": "listItem",
		"o-list-item": "oListItem",
		"group-list-item": "list",
		"group-o-list-item": "oList",
	} as const;

	function getComponent(child: ReturnType<typeof asTree>["children"][number]) {
		return (
			components[
				CHILD_TYPE_RENAMES[child.type as keyof typeof CHILD_TYPE_RENAMES] ||
					(child.type as keyof typeof components)
			] || DefaultComponent
		);
	}
</script>

{#each children as child}
	<svelte:component this={getComponent(child)} node={child.node}>
		<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
		{#if child.children.length > 0}<svelte:self
				children={child.children}
				{components}
			/>{/if}</svelte:component
	>
{/each}
