<script lang="ts">
	import { PrismicImage } from "$lib/components";
	import type { RTAnyNode } from "@prismicio/types";

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
		<!-- TODO: Handle images with `<PrismicImage>` (maybe). -->
		<img src={node.url} alt={node.alt} data-copyright={node.copyright} />
	</p>
{:else if node.type === "embed"}
	<div
		data-oembed={node.oembed.embed_url}
		data-oembed-type={node.oembed.type}
		data-oembed-provider={node.oembed.provider_name}
	>
		{@html node.oembed.html}
	</div>
{:else if node.type === "hyperlink"}
	<!-- TODO: Handle links with `<PrismicLink>`. -->
	<a href="#"><slot /></a>
{:else if node.type === "label"}
	<span class={node.data.label}><slot /></span>
{:else}
	<!-- TODO: Replace `\n` with `<br/>`. Don't use @html since the content is not safe. -->
	{node.text}
{/if}
