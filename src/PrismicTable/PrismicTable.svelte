<script lang="ts">
	import { type TableField, isFilled } from "@prismicio/client";
	import { type Component } from "svelte";

	import type { SvelteRichTextSerializer, TableComponents } from "../types";

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
		components?: TableComponents & SvelteRichTextSerializer;

		/**
		 * The component rendered when the field is empty. If a fallback is not
		 * given, `null` will be rendered.
		 */
		fallback?: Component;
	};

	const { field, components = {}, fallback: Fallback }: Props = $props();

	const Table = components.table ?? DefaultComponent;
	const Thead = components.thead ?? DefaultComponent;
	const Tbody = components.tbody ?? DefaultComponent;
	const Tr = components.tr ?? DefaultComponent;
	const Th = components.th ?? DefaultComponent;
	const Td = components.td ?? DefaultComponent;
</script>

<!-- This formatting is intentional to prevent unwanted whitespace between elements. -->
{#if isFilled.table(field)}
	<Table type="table" table={field}>
		{#if field?.head}
			<Thead type="thead" head={field.head}>
				{#each field.head.rows as row (row.key)}
					<Tr type="tr" {row}>
						{#each row.cells as cell (cell.key)}
							<Th type="th" {cell}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{/each}</Tr
					>{/each}</Thead
			>{/if}<Tbody type="tbody" body={field.body}>
			{#each field.body.rows as row (row.key)}
				<Tr type="tr" {row}>
					{#each row.cells as cell (cell.key)}
						{#if cell.type === "header"}
							<Th type="th" {cell}>
								<PrismicRichText field={cell.content} {components} /></Th
							>{:else}<Td type="td" {cell}>
								<PrismicRichText field={cell.content} {components} /></Td
							>{/if}{/each}</Tr
				>
			{/each}
		</Tbody>
	</Table>
{:else if Fallback}
	<Fallback />
{/if}
