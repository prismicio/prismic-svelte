<script lang="ts">
	import type { RTAnyNode } from "@prismicio/client";

	import PrismicEmbed from "../PrismicEmbed.svelte";
	import PrismicImage from "../PrismicImage.svelte";
	import PrismicLink from "../PrismicLink.svelte";

	export let node: RTAnyNode;
</script>

{#if node.type === "heading1"}
	<h1><slot /></h1>
{:else if node.type === "heading2"}
	<h2><slot /></h2>
{:else if node.type === "heading3"}
	<h3><slot /></h3>
{:else if node.type === "heading4"}
	<h4><slot /></h4>
{:else if node.type === "heading5"}
	<h5><slot /></h5>
{:else if node.type === "heading6"}
	<h6><slot /></h6>
{:else if node.type === "paragraph"}
	<p><slot /></p>
{:else if node.type === "preformatted"}
	<pre><slot /></pre>
{:else if node.type === "strong"}
	<strong><slot /></strong>
{:else if node.type === "em"}
	<em><slot /></em>
{:else if node.type === "list-item"}
	<li><slot /></li>
{:else if node.type === "o-list-item"}
	<li><slot /></li>
{:else if node.type === "group-list-item"}
	<ul><slot /></ul>
{:else if node.type === "group-o-list-item"}
	<ol><slot /></ol>
{:else if node.type === "image"}
	<p class="block-img">
		<PrismicImage field={node} />
	</p>
{:else if node.type === "embed"}
	<PrismicEmbed field={node.oembed} />
{:else if node.type === "hyperlink"}
	<PrismicLink field={node.data}><slot /></PrismicLink>
{:else if node.type === "label"}
	<span class={node.data.label}><slot /></span>
{:else}
	{#each node.text.split("\n") as line, index}
		<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
		{#if index > 0}<br />{/if}{line}
	{/each}
{/if}
