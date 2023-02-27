<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	/**
	 * A Prismic Rich Text or Title field.
	 */
	export let field: prismicT.TitleField | prismicT.RichTextField;

	/**
	 * A function that maps a Rich Text block to a React component.
	 *
	 * @see Learn about HTML serializers {@link https://prismic.io/docs/core-concepts/html-serializer}
	 */
	export let htmlSerializer:
		| prismicH.HTMLFunctionSerializer
		| null
		| undefined = null;

	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your Prismic client uses a Route Resolvers when querying for your
	 * Prismic repository's content (recommended), a Link Resolver is unnecessary.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	export let linkResolver: prismicH.LinkResolverFunction | null | undefined =
		null;
</script>

<!-- 
  @component
  Component to render a Prismic Rich Text or Title field as HTML.
  
  @example Rendering a Rich Text field:
	```svelte
  <PrismicRichText field={document.data.example_rich_text} />
  ```
-->

{@html prismicH.asHTML(field, linkResolver, htmlSerializer)}
