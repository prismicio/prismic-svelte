// @vitest-environment happy-dom
import { expect, it, vi } from "vitest";

import { RichTextField, RichTextNodeType } from "@prismicio/client";
import { cleanup, render } from "@testing-library/svelte";

import { PrismicText } from "../src";

it("renders a string when passed RichTextField", () => {
	const field: RichTextField = [
		{
			type: RichTextNodeType.heading1,
			text: "Heading 1",
			spans: [],
		},
	];

	const { container } = render(PrismicText, { field });

	expect(container.innerHTML).toBe("<div>Heading 1</div>");
});

it("renders nothing when passed an empty field", () => {
	expect(
		render(PrismicText, {
			field: null,
		}).container.innerHTML,
	).toBe("<div></div>");

	cleanup();

	expect(
		render(PrismicText, {
			field: undefined,
		}).container.innerHTML,
	).toBe("<div></div>");

	cleanup();

	expect(
		render(PrismicText, {
			field: [{ type: "paragraph", text: "", spans: [] }],
		}).container.innerHTML,
	).toBe("<div></div>");
});

it("renders the fallback when passed empty field", () => {
	expect(
		render(PrismicText, {
			field: null,
			fallback: "fallback",
		}).container.innerHTML,
	).toBe("<div>fallback</div>");

	cleanup();

	expect(
		render(PrismicText, {
			field: undefined,
			fallback: "fallback",
		}).container.innerHTML,
	).toBe("<div>fallback</div>");

	cleanup();

	expect(
		render(PrismicText, {
			field: [{ type: "paragraph", text: "", spans: [] }],
			fallback: "fallback",
		}).container.innerHTML,
	).toBe("<div>fallback</div>");
});

it("throws error if passed a string-based field (e.g. Key Text or Select)", () => {
	vi.doMock("esm-env", () => ({ DEV: true }));

	expect(() => {
		render(PrismicText, {
			field: "not a Rich Text field",
		});
	}).throws(/prismictext-works-only-with-rich-text-and-title-fields/);

	vi.restoreAllMocks();
});

it("warns if a className prop is provided", () => {
	vi.doMock("esm-env", () => ({ DEV: true }));

	const consoleWarnSpy = vi
		.spyOn(console, "warn")
		.mockImplementation(() => void 0);

	const field: RichTextField = [];

	render(PrismicText, { field, className: "foo" });

	expect(consoleWarnSpy).toHaveBeenCalledWith(
		expect.stringMatching(/classname-is-not-a-valid-prop/),
		field,
	);

	vi.restoreAllMocks();
});
