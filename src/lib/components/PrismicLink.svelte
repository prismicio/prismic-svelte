<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";
	// import { usePrismic } from "../usePrismic";

	type LinkFieldOrDocument = prismicT.LinkField | prismicT.PrismicDocument
	type Rel = string | undefined
	type Target = string | undefined
	
	/**
	 * A Prismic Link field, Content Relationship field, Link to Media field or Document.
	 */
	export let field: LinkFieldOrDocument

	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/core-concepts/link-resolver-route-resolver}
	 */
	export let linkResolver: prismicH.LinkResolverFunction | null | undefined = null

	/**
	 * The HTML `download` attribute
	 * 
	 * @see Learn about `a` tag attributes {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
	 */
	export let download: boolean | null | undefined = null

	/**
	 * The HTML `hreflang` attribute
	 * 
	 * @see Learn about `a` tag attributes {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
	 */
	export let hreflang: string | null | undefined = null

	/**
	 * The HTML `referrerpolicy` attribute
	 * 
	 * @see Learn about `a` tag attributes {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
	 */
	export let referrerpolicy: ReferrerPolicy | null | undefined = null

	/**
	 * The HTML `rel` attribute
	 * 
	 * @see Learn about `a` tag attributes {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
	 */
	export let rel: string | undefined = ""

	/**
	 * The HTML `target` attribute.
	 *
	 * @remarks
	 * If `target` is `null` or `undefined`, `<PrismicLink>` will try check to see if a `target` attribute is set on the Link field. If not, `target` will be undefined.
	 * @see Learn about `a` tag attributes {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
	 */
	export let target: string | undefined = ""

	/**
	 * The HTML `type` attribute
	 * 
	 * @see Learn about `a` tag attributes {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a}
	 */
	export let type: string | null | undefined = null
		
	/**
	 * SvelteKit's `data-sveltekit-preload-data` attribute.
	 * 
	 * @see Learn about SvelteKit link options {@link https://kit.svelte.dev/docs/link-options}
	 */
	export let sveltekitPreloadData: true | "" | "hover" | "tap" | "off" | null | undefined = null

	/**
	 * SvelteKit's `data-sveltekit-preload-code` attribute.
	 * 
	 * @see Learn about SvelteKit link options {@link https://kit.svelte.dev/docs/link-options}
	 */
	export let sveltekitPreloadCode: true | "" | "eager" | "viewport" | "hover" | "tap" | null | undefined = null
	
	/**
	 * SvelteKit's `data-sveltekit-reload` attribute.
	 * 
	 * @see Learn about SvelteKit link options {@link https://kit.svelte.dev/docs/link-options}
	 */
	export let sveltekitReload: true | "" | "off" | null | undefined = null

	/**
	 * SvelteKit's `data-sveltekit-noscroll` attribute.
	 * 
	 * @see Learn about SvelteKit link options {@link https://kit.svelte.dev/docs/link-options}
	 */
	export let sveltekitNoscroll: true | "" | "off" | null | undefined = null

	/**
	 * HTML class attribute. Use a `:global()` selector to target the class.
	 */
	let className: string = ""

	export { className as class }

	function setRel(field: LinkFieldOrDocument, rel: Rel, target: Target) {
		if("id" in field) {
			if(rel) {	
				return rel
			}
			return ""
		}
		if(prismicH.isFilled.link(field)) {
			let rels: string[] = [];
			if (rel) {
				rels.push(...rel?.split(" "))
			};
			if (setTarget(field, target) === "_blank") {
				const defaultBlankTargetRelAttributes = ["noopener", "noreferrer"];
				defaultBlankTargetRelAttributes.forEach((item) => {
					if (!rels.includes(item)) {
						rels.push(item)
					};
				});
			}
			if (!rels.includes("external")) {
				rels.push("external");
			}

			return rels.join(" ");
		}

		return ""
	};

	function setTarget(field: LinkFieldOrDocument, target: Target) {
		if(target) {
			return target
		}
		if("target" in field) {
			return field.target
		}

		return ""
	}

	const attrs = {
		class: className,
		download,
		hreflang,
		referrerpolicy,
		target: setTarget(field, target),
		rel: setRel(field, rel, target),
		type,
	};

	const link: string | null = field
		? prismicH.asLink(field, linkResolver)
		: "";
	const href: string = link || "";
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

<a
	{href}
	{...attrs}
	data-sveltekit-preload-data={sveltekitPreloadData || "hover"}
	data-sveltekit-preload-code={sveltekitPreloadCode || "hover"}
	data-sveltekit-reload={sveltekitReload || "off"}
	data-sveltekit-noscroll={sveltekitNoscroll || "off"}
>
	<slot />
</a>
