// @vitest-environment happy-dom
import * as prismic from "@prismicio/client"
import type { Cookies } from "@sveltejs/kit"
import { render } from "@testing-library/svelte"
import { expect, it } from "vitest"

import { PrismicPreview, redirectToPreviewURL } from "../src/kit"

it("loads the toolbar with v=5 and the preview route's URL", () => {
	render(PrismicPreview, { repositoryName: "qwerty" })

	const script = document.head.querySelector("script")
	expect(script?.src).toBe("https://static.cdn.prismic.io/prismic.js?repo=qwerty&v=5")
	expect(script?.dataset.previewUrl).toBe("/docs/api/preview")
})

it("resolves a custom preview route", () => {
	render(PrismicPreview, { repositoryName: "qwerty", previewURL: "/preview-route" })

	expect(document.head.querySelector("script")?.dataset.previewUrl).toBe("/docs/preview-route")
})

/** Calls the preview route of a website served at `base`. */
const preview = async (search: string, base = "") => {
	const client = prismic.createClient("qwerty")
	client.resolvePreviewURL = async () => "/resolved"
	const cookies: Record<string, unknown[]> = {}

	const response = await redirectToPreviewURL({
		client,
		request: new Request(`https://example.com${base}/api/preview?${search}`),
		cookies: {
			set: (name: string, ...args: unknown[]) => (cookies[name] = args),
		} as unknown as Cookies,
	})

	return { location: response.headers.get("Location"), cookies }
}

it("stores the session and redirects to the shared path", async () => {
	const res = await preview("token=ref&session=abc~xyz&path=/preview/blog?q=1%23top")

	const options = { path: "/", httpOnly: false }
	expect(res.location).toBe("/preview/blog?q=1#top")
	expect(res.cookies).toEqual({
		[prismic.cookie.preview]: ["ref", options],
		[prismic.cookie.previewSession]: ["abc~xyz", options],
	})
})

it.each([
	["", "/preview", "/preview"],
	["", "/blog", "/preview/blog"],
	["", "/previews", "/preview/previews"],
	["/docs", "/docs/preview/blog", "/docs/preview/blog"],
	["/docs", "/docs/blog", "/docs/preview/blog"],
	["/docs", "/docs", "/docs/preview"],
	["/docs", "/docs?q=1#top", "/docs/preview?q=1#top"],
])("redirects inside the preview prefix (base %j, path %j)", async (base, path, location) => {
	const res = await preview(`token=ref&session=abc&path=${encodeURIComponent(path)}`, base)

	expect(res.location).toBe(location)
})

it.each([
	["", "//evil.com"],
	["", "/\\evil.com"],
	["", "/.//evil.com"],
	["", "https://evil.com"],
	["", "blog"],
	["/docs", "/blog"],
	["/docs", "/docs-old"],
])("falls back for an unsafe path (base %j, path %j)", async (base, path) => {
	const res = await preview(`token=ref&session=abc&path=${encodeURIComponent(path)}`, base)

	expect(res.location).toBe("/preview/resolved")
})
