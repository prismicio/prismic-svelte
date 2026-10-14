import type { ImageField } from "@prismicio/client"
import { render } from "@testing-library/svelte"
// @vitest-environment happy-dom
import { expect, it } from "vitest"

import { PrismicImage } from "../src"

const field = {
	url: "https://images.prismic.io/repo/image.png",
	alt: null,
	copyright: null,
	id: "id",
	edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
	dimensions: { width: 1000, height: 500 },
} satisfies ImageField

it("scales the height to the aspect ratio when only a width is given", () => {
	const { container } = render(PrismicImage, { field, width: 400 })
	const img = container.querySelector("img")

	expect(img?.getAttribute("width")).toBe("400")
	expect(img?.getAttribute("height")).toBe("200")
})

it("scales the width to the aspect ratio when only a height is given", () => {
	const { container } = render(PrismicImage, { field, height: 100 })
	const img = container.querySelector("img")

	expect(img?.getAttribute("width")).toBe("200")
	expect(img?.getAttribute("height")).toBe("100")
})
