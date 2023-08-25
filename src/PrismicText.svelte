<script lang="ts">
	import type { RichTextField } from "@prismicio/client";
	import { isFilled, asText } from "@prismicio/client";
	import { DEV } from "esm-env";

	import { devMsg } from "./lib/devMsg";

	/**
	 * A Rich Text or Title field from Prismic.
	 */
	export let field: RichTextField;

	/**
	 * The separator used between blocks. Defaults to `\n`.
	 */
	export let separator: string | undefined = undefined;

	/**
	 * The string rendered when the field is empty. If a fallback is not given,
	 * `null` will be rendered.
	 */
	export let fallback: string | undefined = undefined;

	if (DEV) {
		if ("className" in $$restProps) {
			console.warn(
				`[PrismicText] className cannot be passed to <PrismicText> since it renders plain text without a wrapping component. For more details, see ${devMsg(
					"classname-is-not-a-valid-prop",
				)}.`,
				field,
			);
		}

		if (typeof field === "string") {
			throw new Error(
				`[PrismicText] The "field" prop only accepts a Rich Text or Title field's value but was provided a different type of field instead (e.g. a Key Text or Select field). You can resolve this error by rendering the field value inline without <PrismicText>. For more details, see ${devMsg(
					"prismictext-works-only-with-rich-text-and-title-fields",
				)}`,
			);
		}
	}
</script>

<!--
  @component
  Component to render a Prismic Rich Text or Title field as plain text.

  @example Rendering a Rich Text field:
	```svelte
		<PrismicText field={document.data.example_rich_text} />
  ```
-->

{#if isFilled.richText(field)}
	{asText(field, { separator })}
{:else if fallback !== undefined}
	{fallback}
{/if}
