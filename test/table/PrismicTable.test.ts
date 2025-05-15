// @vitest-environment happy-dom
import { expect, it } from "vitest";

import { TableField } from "@prismicio/client";
import { render } from "@testing-library/svelte";

import CustomParagraph from "./CustomParagraph.svelte";
import CustomTBody from "./CustomTBody.svelte";
import CustomTD from "./CustomTD.svelte";
import CustomTH from "./CustomTH.svelte";
import CustomTHead from "./CustomTHead.svelte";
import CustomTR from "./CustomTR.svelte";
import CustomTable from "./CustomTable.svelte";
import PrismicTableFallback from "./TableFallback.svelte";

import { PrismicTable } from "../../src";

const filledTableField: TableField = {
	head: {
		rows: [
			{
				key: "0",
				cells: [
					{
						key: "0",
						type: "header",
						content: [{ type: "paragraph", text: "Method", spans: [] }],
					},
					{
						key: "1",
						type: "header",
						content: [{ type: "paragraph", text: "Usage", spans: [] }],
					},
				],
			},
		],
	},
	body: {
		rows: [
			{
				key: "0",
				cells: [
					{
						key: "0",
						type: "header",
						content: [{ type: "paragraph", text: "GET", spans: [] }],
					},
					{
						key: "1",
						type: "data",
						content: [
							{
								type: "paragraph",
								text: "For basic retrieval of information…",
								spans: [
									{
										type: "strong",
										end: 19,
										start: 4,
									},
								],
							},
						],
					},
				],
			},
			{
				key: "1",
				cells: [
					{
						key: "0",
						type: "header",
						content: [{ type: "paragraph", text: "DELETE", spans: [] }],
					},
					{
						key: "1",
						type: "data",
						content: [
							{
								type: "paragraph",
								text: "To destroy a resource and remove…",
								spans: [
									{
										type: "em",
										end: 7,
										start: 3,
									},
								],
							},
						],
					},
				],
			},
		],
	},
};

it("renders filled table elements", () => {
	const { container } = render(PrismicTable, { field: filledTableField });

	expect(container.innerHTML).toBe(
		"<table><thead><tr><th><p>Method</p></th><th><p>Usage</p></th></tr></thead><tbody><tr><th><p>GET</p></th><td><p>For <strong>basic retrieval</strong> of information…</p></td></tr><tr><th><p>DELETE</p></th><td><p>To <em>dest</em>roy a resource and remove…</p></td></tr></tbody></table>",
	);
});

it("renders null when passed an empty field", () => {
	const { container } = render(PrismicTable, { field: undefined });

	expect(container.innerHTML).toBe("");
});

it("renders fallback when passed an empty field", () => {
	const { container } = render(PrismicTable, {
		field: undefined,
		fallback: PrismicTableFallback,
	});

	expect(container.innerHTML).toBe("<div>Table</div>");
});

it("renders custom table elements", () => {
	const { container } = render(PrismicTable, {
		field: filledTableField,
		components: {
			table: CustomTable,
			thead: CustomTHead,
			tbody: CustomTBody,
			tr: CustomTR,
			th: CustomTH,
			td: CustomTD,
		},
	});

	expect(container.innerHTML).toBe(
		'<div class="table"><div class="head"><div class="row"><div class="header"><p>Method</p></div><div class="header"><p>Usage</p></div></div></div><div class="body"><div class="row"><div class="header"><p>GET</p></div><div class="data"><p>For <strong>basic retrieval</strong> of information…</p></div></div><div class="row"><div class="header"><p>DELETE</p></div><div class="data"><p>To <em>dest</em>roy a resource and remove…</p></div></div></div></div>',
	);
});

it("renders custom table cell content", () => {
	const { container } = render(PrismicTable, {
		field: filledTableField,
		components: {
			table: CustomTable,
			paragraph: CustomParagraph,
		},
	});

	expect(container.innerHTML).toBe(
		'<div class="table"><thead><tr><th><p class="paragraph">Method</p></th><th><p class="paragraph">Usage</p></th></tr></thead><tbody><tr><th><p class="paragraph">GET</p></th><td><p class="paragraph">For <strong>basic retrieval</strong> of information…</p></td></tr><tr><th><p class="paragraph">DELETE</p></th><td><p class="paragraph">To <em>dest</em>roy a resource and remove…</p></td></tr></tbody></div>',
	);
});
