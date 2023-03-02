<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";
	// import { usePrismic } from "../usePrismic";

	type PrismicLinkProps = {
		/**
		 * A Prismic Link field, Content Relationship field, Link to Media field or Document.
		 */
		field: prismicT.LinkField | prismicT.PrismicDocument;

		/**
		 * The Link Resolver used to resolve links.
		 *
		 * @remarks
		 * If your app uses Route Resolvers when querying for your Prismic
		 * repository's content, a Link Resolver does not need to be provided.
		 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
		 */
		linkResolver?: prismicH.LinkResolverFunction | undefined;
	};

	type $$Props = svelteHTML.IntrinsicElements["a"] & PrismicLinkProps;

	export let field: $$Props["field"];
	export let linkResolver: $$Props["linkResolver"] = undefined;

	export let target: $$Props["target"] = undefined;
	const resolvedTarget =
		target || (field && "target" in field && field.target) || undefined;

	export let rel: $$Props["rel"] = undefined;
	const resolvedRel =
		rel || (target === "_blank" ? "noopener noreferrer" : undefined);

	const href = (field ? prismicH.asLink(field, linkResolver) : "") || "";
</script>

<!-- 
  @component
  Component to render a Prismic Link, Link to Media, Content Relationship, or whole Document as an `a` tag.
  
  @example Rendering a Link field:
	```svelte
		<PrismicLink field={document.data.example_link}>
			Example anchor text.
		</PrismicLink>
  ```
-->

<a {href} {...$$restProps} rel={resolvedRel} target={resolvedTarget}>
	<slot />
</a>
