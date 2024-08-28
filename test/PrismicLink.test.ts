// @vitest-environment happy-dom
import { expect, it } from "vitest";

import { render } from "@testing-library/svelte";

import PrismicLinkTestWrapper from "./PrismicLinkTestWrapper.svelte";

it("renders a link text when passed to PrismicLink", (ctx) => {
	const field = ctx.mock.value.link({
		type: "Web",
		model: { type: "Link", config: { text: { type: "Text" } } },
	});
	const { container } = render(PrismicLinkTestWrapper, { field });

	expect(container.innerHTML).toBe(
		`<div><a href="${field.url}" rel="noreferrer">${field.text}</a></div>`,
	);
});

it("renders a link children instead of text when passed to PrismicLink", (ctx) => {
	const field = ctx.mock.value.link({
		type: "Web",
		model: { type: "Link", config: { text: { type: "Text" } } },
	});
	const children = ctx.mock.value.keyText();
	const { container } = render(PrismicLinkTestWrapper, { field, children });

	expect(container.innerHTML).toBe(
		`<div><a href="${field.url}" rel="noreferrer">${children}</a></div>`,
	);
});
