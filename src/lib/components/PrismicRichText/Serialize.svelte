<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import type {
		RichTextFunctionSerializer,
		TreeNode,
	} from "@prismicio/richtext";

	import Default from "./DefaultComponent.svelte";

	export let serializer:
		| RichTextFunctionSerializer<typeof SvelteComponent, TreeNode>
		| undefined;
	export let nodes: TreeNode[] = [];
</script>

{#each nodes as node}
	<svelte:component
		this={(serializer &&
			serializer(node.type, node.node, node.text, node.children, node.key)) ||
			Default}
		{...node}
	>
		{#if node.children.length > 0}
			<svelte:self nodes={node.children} {serializer} />
		{/if}
	</svelte:component>
{/each}
