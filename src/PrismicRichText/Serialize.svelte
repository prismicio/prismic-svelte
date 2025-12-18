<script lang="ts">
	import type { asTree } from "@prismicio/client/richtext";

	import { type RichTextComponents } from "../types";

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
</script>

{#each children as child (child.key)}
	{@const component =
		components[
			CHILD_TYPE_RENAMES[child.type as keyof typeof CHILD_TYPE_RENAMES] ||
				child.type
		]}
	{#snippet childContent()}
		<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
		{#if child.children.length > 0}<Serialize
				children={child.children}
				{components}
			/>{/if}
	{/snippet}
	{#if typeof component === "function"}
		<component node={child.node}>{@render childContent()}</component>
	{:else}
		<DefaultComponent {...component} node={child.node}
			>{@render childContent()}</DefaultComponent
		>
	{/if}
{/each}
