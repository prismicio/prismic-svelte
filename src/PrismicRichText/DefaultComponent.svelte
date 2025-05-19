<script lang="ts">
	import type { RTAnyNode } from "@prismicio/client";
	import type { Snippet } from "svelte";

	import PrismicEmbed from "../PrismicEmbed.svelte";
	import PrismicImage from "../PrismicImage.svelte";
	import PrismicLink from "../PrismicLink.svelte";

	type Props = {
		node: RTAnyNode;
		children?: Snippet;
	};

	const { node, children }: Props = $props();

	const dirProp = $derived(
		"direction" in node && node.direction === "rtl" ? { direction: "rtl" } : {},
	);
</script>

{#if node.type === "heading1"}
	<h1 {...dirProp}>{@render children?.()}</h1>
{:else if node.type === "heading2"}
	<h2 {...dirProp}>{@render children?.()}</h2>
{:else if node.type === "heading3"}
	<h3 {...dirProp}>{@render children?.()}</h3>
{:else if node.type === "heading4"}
	<h4 {...dirProp}>{@render children?.()}</h4>
{:else if node.type === "heading5"}
	<h5 {...dirProp}>{@render children?.()}</h5>
{:else if node.type === "heading6"}
	<h6 {...dirProp}>{@render children?.()}</h6>
{:else if node.type === "paragraph"}
	<p {...dirProp}>{@render children?.()}</p>
{:else if node.type === "preformatted"}
	<pre>{@render children?.()}</pre>
{:else if node.type === "strong"}
	<strong>{@render children?.()}</strong>
{:else if node.type === "em"}
	<em>{@render children?.()}</em>
{:else if node.type === "list-item"}
	<li {...dirProp}>{@render children?.()}</li>
{:else if node.type === "o-list-item"}
	<li {...dirProp}>{@render children?.()}</li>
{:else if node.type === "group-list-item"}
	<ul>{@render children?.()}</ul>
{:else if node.type === "group-o-list-item"}
	<ol>{@render children?.()}</ol>
{:else if node.type === "image"}
	<p class="block-img">
		<PrismicImage field={node} />
	</p>
{:else if node.type === "embed"}
	<PrismicEmbed field={node.oembed} />
{:else if node.type === "hyperlink"}
	<PrismicLink field={node.data}>{@render children?.()}</PrismicLink>
{:else if node.type === "label"}
	<span class={node.data.label}>{@render children?.()}</span>
{:else}
	{#each node.text.split("\n") as line, index (index)}
		{#if index > 0}<br />{/if}{line}
	{/each}
{/if}
