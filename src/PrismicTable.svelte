<script lang="ts">
	import {
		type TableField,
		TableFieldBody,
		TableFieldBodyRow,
		TableFieldDataCell,
		TableFieldHead,
		TableFieldHeadRow,
		TableFieldHeaderCell,
		isFilled,
	} from "@prismicio/client";
	import { type Component } from "svelte";

	import { type RichTextComponents, type TableComponents } from "./types";

	import PrismicRichText from "./PrismicRichText/PrismicRichText.svelte";

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

	const Table = components.table;
	const Thead = components.thead;
	const Tbody = components.tbody;
	const Tr = components.tr;
	const Th = components.th;
	const Td = components.td;
</script>

{#snippet thead(head: TableFieldHead)}
	{#if typeof Thead === "function"}<Thead {head}
			>{#each head.rows as row (row.key)}{@render tr(row)}{/each}</Thead
		>{:else}<thead {...Thead}
			>{#each head.rows as row (row.key)}{@render tr(row)}{/each}</thead
		>{/if}
{/snippet}

{#snippet tbody(body: TableFieldBody)}
	{#if typeof Tbody === "function"}<Tbody {body}
			>{#each body.rows as row (row.key)}{@render tr(row)}{/each}</Tbody
		>{:else}<tbody {...Tbody}
			>{#each body.rows as row (row.key)}{@render tr(row)}{/each}</tbody
		>{/if}
{/snippet}

{#snippet tr(row: TableFieldHeadRow | TableFieldBodyRow)}
	{#if typeof Tr === "function"}<Tr {row}
			>{#each row.cells as cell (cell.key)}{#if cell.type === "header"}{@render th(
						cell,
					)}{:else}{@render td(cell)}{/if}{/each}</Tr
		>{:else}<tr {...Tr}
			>{#each row.cells as cell (cell.key)}{#if cell.type === "header"}{@render th(
						cell,
					)}{:else}{@render td(cell)}{/if}{/each}</tr
		>{/if}
{/snippet}

{#snippet th(cell: TableFieldHeaderCell)}
	{#if typeof Th === "function"}<Th {cell}
			><PrismicRichText field={cell.content} {components} /></Th
		>{:else}<th {...Th}
			><PrismicRichText field={cell.content} {components} /></th
		>{/if}
{/snippet}

{#snippet td(cell: TableFieldDataCell)}
	{#if typeof Td === "function"}<Td {cell}
			><PrismicRichText field={cell.content} {components} /></Td
		>{:else}<td {...Td}
			><PrismicRichText field={cell.content} {components} /></td
		>{/if}
{/snippet}

<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
{#if isFilled.table(field)}
	{#if typeof Table === "function"}<Table table={field}
			>{#if field?.head}{@render thead(field.head)}{/if}{@render tbody(
				field.body,
			)}</Table
		>{:else}<table {...Table}>
			{#if field?.head}{@render thead(field.head)}{/if}{@render tbody(
				field.body,
			)}
		</table>{/if}
{:else if Fallback}
	<Fallback />
{/if}
