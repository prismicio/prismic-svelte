// @vitest-environment happy-dom
import { expect, it } from "vitest";

import { RichTextField, RichTextNodeType } from "@prismicio/client";
import { render } from "@testing-library/svelte";

import { PrismicRichText } from "../src";

import RichTextWrapperComponent from "./RichTextWrapperComponent.svelte";

it("renders with default components", () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
		{
			type: RichTextNodeType.paragraph,
			text: "Paragraph text",
			spans: [],
		},
	];

	const { container } = render(PrismicRichText, { field });

	const html = container.innerHTML.replaceAll("<!---->", "");
	expect(html).toContain("<h1>Heading 1</h1>");
	expect(html).toContain("<p>Paragraph text</p>");
});

it("renders with a Svelte component", () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const { container } = render(PrismicRichText, {
		field,
		components: {
			heading1: RichTextWrapperComponent,
		},
	});

	expect(container.innerHTML.replaceAll("<!---->", "")).toContain(
		'<div class="wrapper-component">Heading 1</div>',
	);
});

it("renders with shorthand", () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
		{
			type: RichTextNodeType.heading2,
			text: "Heading 2",
			spans: [],
		},
	];

	const { container } = render(PrismicRichText, {
		field,
		components: {
			heading1: {
				class: "heading-1",
				"data-testid": "heading-1",
			},
			heading2: {
				as: "h3",
				class: "heading-2",
				"data-testid": "heading-2",
			},
		},
	});

	const html = container.innerHTML.replaceAll("<!---->", "");
	expect(html).toContain(
		'<h1 class="heading-1" data-testid="heading-1">Heading 1</h1>',
	);
	expect(html).toContain(
		'<h3 class="heading-2" data-testid="heading-2">Heading 2</h3>',
	);
});

