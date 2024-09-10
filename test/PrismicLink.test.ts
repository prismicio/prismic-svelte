// @vitest-environment happy-dom
import { expect, it } from "vitest";

import { render } from "@testing-library/svelte";

import PrismicLinkTestWrapper from "./PrismicLinkTestWrapper.svelte";

it("renders the link's text if no children are provided", (ctx) => {
	const model = ctx.mock.model.link({
		allowText: true,
		allowTargetBlank: false,
	});
	const field = ctx.mock.value.link({ type: "Web", model, withText: true });
	const { container } = render(PrismicLinkTestWrapper, { field });

	expect(container.innerHTML).toBe(
		`<div><a href="${field.url}" rel="noreferrer">${field.text}</a></div>`,
	);
});

it("renders the given children, overriding the link's text", (ctx) => {
	const model = ctx.mock.model.link({
		allowText: true,
		allowTargetBlank: false,
	});
	const field = ctx.mock.value.link({ type: "Web", model });
	const children = ctx.mock.value.keyText();
	const { container } = render(PrismicLinkTestWrapper, { field, children });

	expect(container.innerHTML).toBe(
		`<div><a href="${field.url}" rel="noreferrer">${children}</a></div>`,
	);
});
