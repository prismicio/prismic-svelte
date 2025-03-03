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

	/**
	 * This function creates the needed table components, prioritizing any user
	 * provided custom components and falling back to the default components.
	 */
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
	<Table {...tableProps} table={field}>
		{#if field?.head}
			<Thead {...theadProps} head={field.head}>
				{#each field.head.rows as row}
					<Tr {...trProps} {row}>
						{#each row.cells as cell}
							<Th {...thProps} {cell}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{/each}</Tr
					>{/each}</Thead
			>{/if}<Tbody {...tbodyProps} body={field.body}>
			{#each field.body.rows as row}
				<Tr {...trProps} {row}>
					{#each row.cells as cell}
						{#if cell.type === "header"}
							<Th {...thProps} {cell}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{:else}<Td {...tdProps} {cell}>
								<PrismicRichText field={cell.content} {components} /></Td
							>{/if}{/each}</Tr
				>
			{/each}
		</Tbody>
	</Table>
{:else if fallback !== undefined}
	<svelte:component this={fallback} />
{/if}
