<script lang="ts">
	import {
		type AsLinkAttrsConfig,
		type LinkField,
		type PrismicDocument,
		asLinkAttrs,
	} from "@prismicio/client";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type Props = Omit<HTMLAnchorAttributes, "rel" | "href"> & {
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
					field: LinkField | null | undefined;
					document?: never;
					href?: never;
			  }
			| {
					/**
					 * A Prismic document.
					 */
					document: PrismicDocument | null | undefined;
					field?: never;
					href?: never;
			  }
			| {
					href: HTMLAnchorAttributes["href"];
					document: never;
					field?: never;
			  }
		);

	const { field, document, rel, children, ...restProps }: Props = $props();

	const linkAttrs = $derived(
		asLinkAttrs(field ?? document, {
			rel: typeof rel === "function" ? rel : undefined,
		}),
	);
	const href = $derived(
		("href" in restProps ? restProps.href : linkAttrs.href) || "",
	);

	const resolvedRel = $derived(typeof rel === "string" ? rel : linkAttrs.rel);
</script>

<!--
  @component
  Component to render a Prismic link, link to media, content relationship, or whole document as an `a` tag.

  @example Rendering a Link field:
	```svelte
		<PrismicLink field={document.data.example_link} />
	```
-->

<a {...linkAttrs} rel={resolvedRel} {href} {...restProps}>
	{#if children}{@render children?.()}{:else}{field?.text}{/if}
</a>
