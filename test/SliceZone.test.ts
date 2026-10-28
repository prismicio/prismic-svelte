// @vitest-environment happy-dom
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { render } from "@testing-library/svelte"
import { hydrate, tick, unmount } from "svelte"
import { createServer } from "vite"
import { expect, it } from "vitest"

import { SliceZone } from "../src"
import TestSlice from "./SliceZoneTestSlice.svelte"

const slices = [
	{ id: "fragment", slice_type: "fragment" },
	{ id: "empty", slice_type: "empty" },
	{ type: "unmarked" },
	{ __mapped: true as const, id: "mapped", slice_type: "fragment", label: "mapped" },
]
const components = { fragment: TestSlice, empty: TestSlice, unmarked: TestSlice }
const fragmentHTML =
	"<!--prismic-slice-start:fragment--><span>fragment</span><span>content</span><!--prismic-slice-end:fragment-->"
const emptyHTML = "<!--prismic-slice-start:empty--><!--prismic-slice-end:empty-->"
const unmarkedHTML = "<span>unmarked</span><span>content</span>"
const mappedHTML =
	"<!--prismic-slice-start:mapped--><span>mapped</span><span>content</span><!--prismic-slice-end:mapped-->"
const initialHTML = fragmentHTML + emptyHTML + unmarkedHTML + mappedHTML

it("keeps boundaries around fragment, empty, and mapped slices through reordering and removal", async () => {
	const { container, rerender } = render(SliceZone, { slices, components })
	expect(sliceHTML(container)).toBe(initialHTML)

	await rerender({ slices: slices.toReversed() })
	expect(sliceHTML(container)).toBe(mappedHTML + unmarkedHTML + emptyHTML + fragmentHTML)

	await rerender({ slices: [slices[0]] })
	expect(sliceHTML(container)).toBe(fragmentHTML)

	await rerender({ slices: [] })
	expect(sliceHTML(container)).toBe("")
})

it("renders server boundaries and hydrates the same elements without adding spaces", async () => {
	const server = await createServer({
		configFile: false,
		plugins: [svelte()],
		server: { middlewareMode: true, hmr: false },
	})
	try {
		const { default: ServerSliceZone } = await server.ssrLoadModule(
			"/src/SliceZone/SliceZone.svelte",
		)
		const { default: ServerTestSlice } = await server.ssrLoadModule(
			"/test/SliceZoneTestSlice.svelte",
		)
		const { render: renderServer } = await server.ssrLoadModule("svelte/server")
		const { body } = renderServer(ServerSliceZone, {
			props: { slices, defaultComponent: ServerTestSlice },
		})
		const container = document.createElement("div")
		container.innerHTML = body
		expect(sliceHTML(container)).toBe(initialHTML)
		const element = container.firstElementChild
		const component = hydrate(SliceZone, {
			target: container,
			props: { slices, defaultComponent: TestSlice },
			recover: false,
		})
		try {
			await tick()
			expect(sliceHTML(container)).toBe(initialHTML)
			expect(container.firstElementChild).toBe(element)
		} finally {
			await unmount(component)
		}
	} finally {
		await server.close()
	}
})

it("prevents a Slice ID from closing a comment and injecting HTML", () => {
	const { container } = render(SliceZone, {
		slices: [{ id: "--><img src=x>", slice_type: "empty" }],
		components,
	})
	expect(sliceHTML(container)).toBe(
		"<!--prismic-slice-start:--&gt;<img src=x&gt;--><!--prismic-slice-end:--&gt;<img src=x&gt;-->",
	)
})

function sliceHTML(container: Element): string {
	// Ignore Svelte's hydration comments, keeping Slice markers and all whitespace.
	return container.innerHTML.replaceAll(/<!--(?!prismic-slice-)[\s\S]*?-->/g, "")
}
