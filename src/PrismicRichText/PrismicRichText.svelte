<script lang="ts">
	import type { RichTextField } from "@prismicio/client";
	import { asTree } from "@prismicio/client/richtext";

	import type { RichTextComponent, RichTextComponents, ComponentShorthand, InternalRichTextComponents } from "../types";
	import { isSvelteComponent } from "../types";

	import DefaultComponent from "./DefaultComponent.svelte";
	import Serialize from "./Serialize.svelte";

	type Props = {
		/**
		 * The Prismic rich text field to render.
		 */
		field: RichTextField;

		/**
		 * An object that maps a rich text block type to a Svelte component.
		 */
		components?: RichTextComponents;
	};

	const { field, components = {} }: Props = $props();

	const children = $derived(asTree(field).children);

	function getInternalComponent(type: keyof RichTextComponents) {
		const maybeComponentOrShorthand = components?.[type] as RichTextComponent | ComponentShorthand | undefined;

		if (isSvelteComponent(maybeComponentOrShorthand)) {
			return { is: maybeComponentOrShorthand };
		}

		return { is: DefaultComponent, shorthand: maybeComponentOrShorthand };
	}

	const internalComponents = $derived<InternalRichTextComponents>({
		heading1: getInternalComponent("heading1"),
		heading2: getInternalComponent("heading2"),
		heading3: getInternalComponent("heading3"),
		heading4: getInternalComponent("heading4"),
		heading5: getInternalComponent("heading5"),
		heading6: getInternalComponent("heading6"),
		paragraph: getInternalComponent("paragraph"),
		preformatted: getInternalComponent("preformatted"),
		strong: getInternalComponent("strong"),
		em: getInternalComponent("em"),
		"list-item": getInternalComponent("listItem"),
		"o-list-item": getInternalComponent("oListItem"),
		"group-list-item": getInternalComponent("list"),
		"group-o-list-item": getInternalComponent("oList"),
		image: getInternalComponent("image"),
		embed: getInternalComponent("embed"),
		hyperlink: getInternalComponent("hyperlink"),
		label: getInternalComponent("label"),
		span: getInternalComponent("span"),
	});
</script>

<!--
  @component
  Component to render a Prismic rich text field.

  @example Rendering a rich text field:
	```svelte
		<PrismicRichText field={document.data.example_rich_text} />
	```
-->

<Serialize {children} {internalComponents} />
