<script lang="ts">
	import {
		asLinkAttrs,
		type AsLinkAttrsConfig,
		type LinkField,
		type PrismicDocument,
	} from "@prismicio/client";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type $$Props = Omit<HTMLAnchorAttributes, "rel" | "href"> & {
		/**
		 * The `rel` attribute for the link. By default, `"noreferrer"` is provided
		 * if the link's URL is external. This prop can be provided a function to
		 * use the link's metadata to determine the `rel` value.
		 */
		rel?: string | AsLinkAttrsConfig["rel"];
	} & (
			| {
					/**
					 * A Prismic link field, content relationship field, or link to media
					 * field.
					 */
					field: LinkField;
					document?: never;
			  }
			| {
					/**
					 * A Prismic document.
					 */
					document: PrismicDocument;
					field?: never;
			  }
		);

	export let field: $$Props["field"] = undefined;
	export let document: $$Props["document"] = undefined;
	export let rel: $$Props["rel"] = undefined;

	$: linkAttrs = asLinkAttrs(field ?? document, {
		rel: typeof rel === "function" ? rel : undefined,
	});

	$: resolvedRel = typeof rel === "string" ? rel : linkAttrs.rel;
</script>

<!--
  @component
  Component to render a Prismic link, link to media, content relationship, or whole document as an `a` tag.

  @example Rendering a Link field:
	```svelte
		<PrismicLink field={document.data.example_link}>
			Example anchor text.
		</PrismicLink>
	```
-->

<a {...linkAttrs} rel={resolvedRel} href={linkAttrs.href} {...$$restProps}>
	<slot />
</a>
