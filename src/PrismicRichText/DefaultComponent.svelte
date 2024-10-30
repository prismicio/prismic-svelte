<script lang="ts">
	import type { RTAnyNode } from "@prismicio/client";

	import PrismicEmbed from "../PrismicEmbed.svelte";
	import PrismicImage from "../PrismicImage.svelte";
	import PrismicLink from "../PrismicLink.svelte";

	export let node: RTAnyNode;

	$: dir = "direction" in node && node.direction === "rtl" ? "rtl" : undefined
</script>

{#if node.type === "heading1"}
	<h1 {dir}><slot /></h1>
{:else if node.type === "heading2"}
	<h2 {dir}><slot /></h2>
{:else if node.type === "heading3"}
	<h3 {dir}><slot /></h3>
{:else if node.type === "heading4"}
	<h4 {dir}><slot /></h4>
{:else if node.type === "heading5"}
	<h5 {dir}><slot /></h5>
{:else if node.type === "heading6"}
	<h6 {dir}><slot /></h6>
{:else if node.type === "paragraph"}
	<p {dir}><slot /></p>
{:else if node.type === "preformatted"}
	<pre><slot /></pre>
{:else if node.type === "strong"}
	<strong><slot /></strong>
{:else if node.type === "em"}
	<em><slot /></em>
{:else if node.type === "list-item"}
	<li {dir}><slot /></li>
{:else if node.type === "o-list-item"}
	<li {dir}><slot /></li>
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
		{#if index > 0}<br />{/if}{line}
	{/each}
{/if}
