<script lang="ts">
	import type * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";
	import type * as prismicR from "@prismicio/richtext";

	type RichTextTree = ReturnType<typeof prismicR.asTree>;
	type RichTextBranch = RichTextTree["children"][number];

	export let linkResolver: prismicH.LinkResolverFunction | undefined =
		undefined;

	/**
	 * A Rich Text tree from prismicR.asTree()
	 */
	export let tree: RichTextTree | RichTextBranch;

	/**
	 * Svelte components mapped to Prismic Rich Text node types
	 */
	export let map: any = {};

	function getFieldData(tree: prismicT.RTAnyNode) {
		if (tree.type === "image") return tree;
		if (tree.type === "hyperlink") return tree.data;
		if (tree.type === "embed") return tree.oembed;
		return;
	}
</script>

{#if "type" in tree && map[tree.type]}
	<svelte:component
		this={map[tree.type]}
		{...tree.node}
		linkResolver={tree.type === "hyperlink" ? linkResolver : undefined}
		field={getFieldData(tree.node)}
	>
		{#each tree.children as child}
			<svelte:self {map} tree={child} />
		{:else}
			{tree.text}
		{/each}
	</svelte:component>
{:else}
	{#each tree.children as child}
		<svelte:self {map} tree={child} />
	{:else}
		{#if "text" in tree}
			{tree.text}
		{/if}
	{/each}
{/if}
