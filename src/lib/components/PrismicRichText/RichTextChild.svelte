<script lang="ts">
	import type * as prismicH from "@prismicio/helpers";
	import Element from "./Element.svelte";
	import RichTextChildren from "./RichTextChildren.svelte";
	import { PrismicLink, PrismicImage } from "./../";

	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your Prismic client uses a Route Resolvers when querying for your
	 * Prismic repository's content (recommended), a Link Resolver is unnecessary.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	export let linkResolver: prismicH.LinkResolverFunction | undefined =
		undefined;

	export let tree: any;

	export let map: any = {};

	const elements = [
		"heading1",
		"heading2",
		"heading3",
		"heading4",
		"heading5",
		"heading6",
		"paragraph",
		"preformatted",
		"strong",
		"em",
		"list",
		"oList",
		"listItem",
		"list-item",
		"o-list-item",
		"grou-list-item",
		"group-o-list-item",
	];
</script>

{#if map[tree.type]}
	<svelte:component this={map[tree.type]} {...tree.node} {linkResolver}>
		<RichTextChildren {map} {tree} />
	</svelte:component>
{:else if elements.includes(tree.type)}
	<Element type={tree.type}>
		<RichTextChildren {map} {tree} />
	</Element>
{:else if tree.type === "image"}
	<PrismicImage field={tree.node} />
{:else if tree.type === "embed"}
	{@html tree.node.oembed.html}
{:else if tree.type === "hyperlink"}
	<PrismicLink field={tree.node.data} {linkResolver}>
		<RichTextChildren {map} {tree} />
	</PrismicLink>
{:else if tree.type === "label"}
	<span class={tree.node.data.label}>
		<RichTextChildren {map} {tree} />
	</span>
{:else}
	<RichTextChildren {map} {tree} />
{/if}
