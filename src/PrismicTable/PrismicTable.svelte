<script lang="ts">
	import { isFilled, type TableField } from "@prismicio/client";
	import { type ComponentType } from "svelte";

	import PrismicRichText from "../PrismicRichText/PrismicRichText.svelte";
	import { SvelteRichTextSerializer, type TableComponents } from "../types";
	import DefaultComponent from "./DefaultComponent.svelte";

	/**
	 * The Prismic table field to render.
	 */
	export let field: TableField;

	/**
	 * An object that maps a rich text block type to a Svelte component.
	 */
	export let components: TableComponents & SvelteRichTextSerializer = {};

	/**
	 * The component rendered when the field is empty. If a fallback is not given,
	 * `null` will be rendered.
	 */
	export let fallback: ComponentType | undefined = undefined;

	const createComponent = (type: keyof TableComponents) => {
		const Component: ComponentType = components[type] ?? DefaultComponent;
		return {
			Component,
			props: Component === DefaultComponent ? { type } : {},
		};
	};

	const { Component: Table, props: tableProps } = createComponent("table");
	const { Component: Thead, props: theadProps } = createComponent("thead");
	const { Component: Tbody, props: tbodyProps } = createComponent("tbody");
	const { Component: Tr, props: trProps } = createComponent("tr");
	const { Component: Th, props: thProps } = createComponent("th");
	const { Component: Td, props: tdProps } = createComponent("td");
</script>

<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
{#if isFilled.table(field)}
	<Table {...tableProps}>
		{#if field?.head}
			<Thead {...theadProps}>
				{#each field.head.rows as row}
					<Tr {...trProps}>
						{#each row.cells as cell}
							<Th {...thProps}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{/each}</Tr
					>{/each}</Thead
			>{/if}<Tbody {...tbodyProps}>
			{#each field.body.rows as row}
				<Tr {...trProps}>
					{#each row.cells as cell}
						{#if cell.type === "header"}
							<Th {...thProps}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{:else}<Td {...tdProps}>
								<PrismicRichText field={cell.content} {components} /></Td
							>{/if}{/each}</Tr
				>
			{/each}
		</Tbody>
	</Table>
{:else if fallback !== undefined}
	<svelte:component this={fallback} />
{/if}
