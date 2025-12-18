<script lang="ts">
	import type { asTree } from "@prismicio/client/richtext";

	import type { RichTextComponents } from "../types";

	import DefaultComponent from "./DefaultComponent.svelte";
	import Serialize from "./Serialize.svelte";

	type Props = {
		components: RichTextComponents;
		children: ReturnType<typeof asTree>["children"];
	};

	const { components, children }: Props = $props();

	const CHILD_TYPE_RENAMES = {
		"list-item": "listItem",
		"o-list-item": "oListItem",
		"group-list-item": "list",
		"group-o-list-item": "oList",
	} as const;

	function getComponent(child: ReturnType<typeof asTree>["children"][number]) {
		return components[
			CHILD_TYPE_RENAMES[child.type as keyof typeof CHILD_TYPE_RENAMES] ||
				(child.type as keyof typeof components)
		];
	}
</script>

{#each children as child (child.key)}
	{@const component = getComponent(child)}
	{#snippet serializedChildren()}
		<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
		{#if child.children.length > 0}<Serialize
				children={child.children}
				{components}
			/>{/if}
	{/snippet}
	{#if typeof component === "function"}
		<component node={child.node}>{@render serializedChildren()}</component>
	{:else}
		<DefaultComponent {...component} node={child.node}
			>{@render serializedChildren()}</DefaultComponent
		>
	{/if}
{/each}
