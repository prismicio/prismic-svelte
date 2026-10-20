// @vitest-environment happy-dom
import * as prismic from "@prismicio/client"
import type { Cookies } from "@sveltejs/kit"
import { render } from "@testing-library/svelte"
import { expect, it } from "vitest"

import { PrismicPreview, redirectToPreviewURL } from "../src/kit"

it("loads the toolbar with v=5", () => {
	render(PrismicPreview, { repositoryName: "qwerty" })

	expect(document.head.querySelector("script")?.src).toBe(
		"https://static.cdn.prismic.io/prismic.js?new=true&repo=qwerty&v=5",
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
			set: (...args: unknown[]) => (cookies[String(args[0])] = args),
		} as unknown as Cookies,
	})

	expect(response.headers.get("Location")).toBe("/preview/resolved")
	expect(cookies).toEqual({
		[prismic.cookie.preview]: [prismic.cookie.preview, "ref", { path: "/", httpOnly: false }],
		"io.prismic.previewSession": [
			"io.prismic.previewSession",
			"abc~xyz",
			{ path: "/", httpOnly: false },
		],
	})
})
