<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import type { RichTextComponentProps } from "../types";

	import PrismicEmbed from "../PrismicEmbed.svelte";
	import PrismicImage from "../PrismicImage.svelte";
	import PrismicLink from "../PrismicLink.svelte";

	type Props = RichTextComponentProps &
		HTMLAttributes<HTMLElement> & { as?: string };

	const { node, children, as, ...attrs }: Props = $props();

	const dirProp = $derived(
		"direction" in node && node.direction === "rtl" ? { direction: "rtl" } : {},
	);
</script>

{#if as}
	<svelte:element this={as} {...dirProp} {...attrs} {...attrs}
		>{@render children()}</svelte:element
	>
{:else if node.type === "heading1"}
	<h1 {...dirProp} {...attrs}>{@render children()}</h1>
{:else if node.type === "heading2"}
	<h2 {...dirProp} {...attrs}>{@render children()}</h2>
{:else if node.type === "heading3"}
	<h3 {...dirProp} {...attrs}>{@render children()}</h3>
{:else if node.type === "heading4"}
	<h4 {...dirProp} {...attrs}>{@render children()}</h4>
{:else if node.type === "heading5"}
	<h5 {...dirProp} {...attrs}>{@render children()}</h5>
{:else if node.type === "heading6"}
	<h6 {...dirProp} {...attrs}>{@render children()}</h6>
{:else if node.type === "paragraph"}
	<p {...dirProp} {...attrs}>{@render children()}</p>
{:else if node.type === "preformatted"}
	<pre {...attrs}>{@render children()}</pre>
{:else if node.type === "strong"}
	<strong {...attrs}>{@render children()}</strong>
{:else if node.type === "em"}
	<em {...attrs}>{@render children()}</em>
{:else if node.type === "list-item"}
	<li {...dirProp} {...attrs}>{@render children()}</li>
{:else if node.type === "o-list-item"}
	<li {...dirProp} {...attrs}>{@render children()}</li>
{:else if node.type === "group-list-item"}
	<ul {...attrs}>{@render children()}</ul>
{:else if node.type === "group-o-list-item"}
	<ol {...attrs}>{@render children()}</ol>
{:else if node.type === "image"}
	<p class="block-img">
		{#if node.linkTo}
			<PrismicLink field={node.linkTo}>
				<PrismicImage field={node} {...attrs} />
			</PrismicLink>
		{:else}
			<PrismicImage field={node} {...attrs} />
		{/if}
	</p>
{:else if node.type === "embed"}
	<PrismicEmbed field={node.oembed} {...attrs} />
{:else if node.type === "hyperlink"}
	<PrismicLink field={node.data} {...attrs}>{@render children()}</PrismicLink>
{:else if node.type === "label"}
	<span class={node.data.label} {...attrs}>{@render children()}</span>
{:else}
	{#each node.text.split("\n") as line, index (index)}
		{#if index > 0}<br />{/if}{line}
	{/each}
{/if}
