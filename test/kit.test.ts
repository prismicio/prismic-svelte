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

it("stores the session with the preview cookie's attributes", async () => {
	const client = prismic.createClient("qwerty")
	client.resolvePreviewURL = async () => "/resolved"
	const cookies: Record<string, unknown[]> = {}

	const response = await redirectToPreviewURL({
		client,
		request: new Request("https://example.com/api/preview?token=ref&session=abc~xyz"),
		cookies: {
			set: (name: string, ...args: unknown[]) => (cookies[name] = args),
		} as unknown as Cookies,
	})

	const options = { path: "/", httpOnly: false }
	expect(response.headers.get("Location")).toBe("/preview/resolved")
	expect(cookies).toEqual({
		[prismic.cookie.preview]: ["ref", options],
		[prismic.cookie.previewSession]: ["abc~xyz", options],
	})
})
