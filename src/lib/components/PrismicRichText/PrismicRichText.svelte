<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import * as prismicR from "@prismicio/richtext";
	import type * as prismicT from "@prismicio/types";
	import type { SvelteComponent } from "svelte";
	import RichTextChild from "./RichTextChild.svelte";
	import BasicElement from "./BasicElement.svelte";
	import { PrismicLink, PrismicImage, PrismicEmbed } from "./../";

	type ComponentsMap = { [index: string]: typeof SvelteComponent };

	/**
	 * A Prismic Rich Text or Title field.
	 */
	export let field: prismicT.TitleField | prismicT.RichTextField;

	/**
	 * A function that accepts a Rich Text element and returns a string.
	 *
	 * @see Learn about Rich Text serializing {@link https://prismic.io/docs/core-concepts/html-serializer}
	 */
	export let functionSerializer: prismicH.HTMLFunctionSerializer | undefined =
		undefined;

	/**
	 * An objects that maps Rich Text elements to Svelte components
	 *
	 * @see Learn about Rich Text serializing {@link https://prismic.io/docs/core-concepts/html-serializer}
	 */
	export let components: ComponentsMap | undefined = undefined;

	const defaultComponents = {
		heading1: BasicElement,
		heading2: BasicElement,
		heading3: BasicElement,
		heading4: BasicElement,
		heading5: BasicElement,
		heading6: BasicElement,
		paragraph: BasicElement,
		preformatted: BasicElement,
		strong: BasicElement,
		label: BasicElement,
		em: BasicElement,
		list: BasicElement,
		oList: BasicElement,
		listItem: BasicElement,
		"list-item": BasicElement,
		"o-list-item": BasicElement,
		"grou-list-item": BasicElement,
		"group-o-list-item": BasicElement,
		hyperlink: PrismicLink,
		image: PrismicImage,
		embed: PrismicEmbed,
	} as const;

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
</script>

<!-- 
  @component
  Component to render a Prismic Rich Text or Title field as HTML.
  
  @example Rendering a Rich Text field:
	```svelte
  <PrismicRichText field={document.data.example_rich_text} />
  ```
-->

{#if components}
	<RichTextChild
		tree={prismicR.asTree(field)}
		map={{ ...defaultComponents, ...components }}
		{linkResolver}
	/>
{:else}
	{@html prismicH.asHTML(field, linkResolver, functionSerializer)}
{/if}
