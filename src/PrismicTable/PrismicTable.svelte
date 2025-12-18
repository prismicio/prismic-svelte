<script lang="ts">
	import { type TableField, isFilled } from "@prismicio/client";
	import { type Component } from "svelte";

	import {
		isSvelteComponent,
		type RichTextComponents,
		type TableComponents,
	} from "../types";

	import PrismicRichText from "../PrismicRichText/PrismicRichText.svelte";

	import DefaultComponent from "./DefaultComponent.svelte";

	type Props = {
		/**
		 * The Prismic table field to render.
		 */
		field: TableField;

		/**
		 * An object that maps a rich text block type to a Svelte component.
		 */
		components?: TableComponents & RichTextComponents;

		/**
		 * The component rendered when the field is empty. If a fallback is not
		 * given, `null` will be rendered.
		 */
		fallback?: Component;
	};

	const { field, components = {}, fallback: Fallback }: Props = $props();

	const { Table, tableProps } = isSvelteComponent(components.table)
		? { Table: components.table }
		: {
				Table: DefaultComponent,
				tableProps: { type: "table", shorthand: components.table } as const,
			};

	const { Thead, theadProps } = isSvelteComponent(components.thead)
		? { Thead: components.thead }
		: {
				Thead: DefaultComponent,
				theadProps: { type: "thead", shorthand: components.thead } as const,
			};

	const { Tbody, tbodyProps } = isSvelteComponent(components.tbody)
		? { Tbody: components.tbody }
		: {
				Tbody: DefaultComponent,
				tbodyProps: { type: "tbody", shorthand: components.tbody } as const,
			};

	const { Tr, trProps } = isSvelteComponent(components.tr)
		? { Tr: components.tr }
		: {
				Tr: DefaultComponent,
				trProps: { type: "tr", shorthand: components.tr } as const,
			};

	const { Th, thProps } = isSvelteComponent(components.th)
		? { Th: components.th }
		: {
				Th: DefaultComponent,
				thProps: { type: "th", shorthand: components.th } as const,
			};

	const { Td, tdProps } = isSvelteComponent(components.td)
		? { Td: components.td }
		: {
				Td: DefaultComponent,
				tdProps: { type: "td", shorthand: components.td } as const,
			};
</script>

<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
{#if isFilled.table(field)}
	<Table {...tableProps} table={field}>
		{#if field?.head}
			<Thead {...theadProps} head={field.head}>
				{#each field.head.rows as row (row.key)}
					<Tr {...trProps} {row}>
						{#each row.cells as cell (cell.key)}
							<Th {...thProps} {cell}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{/each}</Tr
					>{/each}</Thead
			>{/if}<Tbody {...tbodyProps} body={field.body}>
			{#each field.body.rows as row (row.key)}
				<Tr {...trProps} {row}>
					{#each row.cells as cell (cell.key)}
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
{:else if Fallback}
	<Fallback />
{/if}
