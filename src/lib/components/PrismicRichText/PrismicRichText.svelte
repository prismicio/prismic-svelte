<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import type { RichTextField } from "@prismicio/types";
	import {
		asTree,
		wrapMapSerializer,
		type RichTextFunctionSerializer,
		type RichTextMapSerializer,
		type TreeNode,
	} from "@prismicio/richtext";

	import Serialize from "./Serialize.svelte";
	import type { LinkResolverFunction } from "@prismicio/helpers";

	/**
	 * The Prismic Rich Text field to render.
	 */
	export let field: RichTextField = [];

	/**
	 * The Link Resolver used to resolve links.
	 *
	 * @remarks
	 * If your app uses Route Resolvers when querying for your Prismic
	 * repository's content, a Link Resolver does not need to be provided.
	 * @see Learn about Link Resolvers and Route Resolvers {@link https://prismic.io/docs/route-resolver}
	 */
	export let linkResolver: LinkResolverFunction | undefined = undefined;

	/**
	 * An object that maps Rich Text blocks to functions.
	 *
	 * @example A serializer that modififes `h1` and `em` elements:
	 *
	 * ```js
	 * import Title from "./Title.svelte";
	 *
	 * const field = exampleRichText;
	 *
	 * const richTextSerializer = {
	 * 	h1: () => Title,
	 * 	em: ({ children }) => `<mark>${children}</mark>`,
	 * };
	 * ```
	 */
	export let richTextSerializer:
		| RichTextMapSerializer<typeof SvelteComponent, TreeNode>
		| RichTextFunctionSerializer<typeof SvelteComponent, TreeNode>
		| undefined = undefined;

	const resolvedSerializer =
		typeof richTextSerializer === "object"
			? wrapMapSerializer(richTextSerializer)
			: richTextSerializer;

	const nodes = asTree(field).children;
</script>

<!-- 
  @component
  Component to render a Prismic Rich Text or Title field as HTML.
  
  @example Rendering a Link field:
	```svelte
		<PrismicRichText field={document.data.example_rich_text} />
  ```
-->

<Serialize {nodes} serializer={resolvedSerializer} {linkResolver} />
