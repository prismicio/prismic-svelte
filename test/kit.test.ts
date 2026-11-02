// @vitest-environment happy-dom
import * as prismic from "@prismicio/client"
import type { Cookies } from "@sveltejs/kit"
import { render } from "@testing-library/svelte"
import { expect, it } from "vitest"

import { PrismicPreview, redirectToPreviewURL } from "../src/kit"

it("loads the toolbar with v=5", () => {
	render(PrismicPreview, { repositoryName: "qwerty" })

	expect(document.head.querySelector("script")?.src).toBe(
		"https://static.cdn.prismic.io/prismic.js?repo=qwerty&v=5",
	)
})

const preview = async (search: string) => {
	const client = prismic.createClient("qwerty")
	client.resolvePreviewURL = async () => "/resolved"
	const cookies: Record<string, unknown[]> = {}

	const response = await redirectToPreviewURL({
		client,
		request: new Request(`https://example.com/api/preview?${search}`),
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

it.each(["//evil.com", "/\\evil.com", "/.//evil.com", "https://evil.com", "blog"])(
	"falls back for an unsafe path (%j)",
	async (path) => {
		const res = await preview(`token=ref&session=abc&path=${encodeURIComponent(path)}`)

		expect(res.location).toBe("/preview/resolved")
	},
)
