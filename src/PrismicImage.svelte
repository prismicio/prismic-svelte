<script lang="ts">
	import {
		asImageWidthSrcSet,
		asImagePixelDensitySrcSet,
		isFilled,
		type ImageFieldImage,
	} from "@prismicio/client";
	import type { ImgixURLParams } from "imgix-url-builder";
	import type { HTMLImgAttributes } from "svelte/elements";

	type $$Props = Omit<HTMLImgAttributes, "src" | "srcset" | "alt"> & {
		/**
		 * The Prismic image field or thumbnail to render.
		 */
		field: ImageFieldImage | null | undefined;

		/**
		 * An object of Imgix URL API parameters to transform the image.
		 *
		 * See: https://docs.imgix.com/apis/rendering
		 */
		imgixParams?: ImgixURLParams;

		/**
		 * Declare an image as decorative by providing `alt=""`.
		 *
		 * See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
		 */
		alt?: "";

		/**
		 * Declare an image as decorative only if the Image field does not have
		 * alternative text by providing `fallbackAlt=""`.
		 *
		 * See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
		 */
		fallbackAlt?: "";
	} & (
			| {
					/**
					 * Widths used to build a `srcset` value for the Image field.
					 *
					 * If a `widths` prop is not given or `"defaults"` is passed, the
					 * following widths will be used: 640, 750, 828, 1080, 1200, 1920,
					 * 2048, 3840.
					 *
					 * If the Image field contains responsive views, each responsive view
					 * can be used as a width in the resulting `srcset` by passing
					 * `"thumbnails"` as the `widths` prop.
					 */
					widths?:
						| NonNullable<Parameters<typeof asImageWidthSrcSet>[1]>["widths"]
						| "defaults";
					pixelDensities?: never;
			  }
			| {
					/**
					 * Pixel densities used to build a `srcset` value for the Image field.
					 *
					 * If a `pixelDensities` prop is passed `"defaults"`, the following
					 * pixel densities will be used: 1, 2, 3.
					 */
					pixelDensities:
						| NonNullable<
								Parameters<typeof asImagePixelDensitySrcSet>[1]
						  >["pixelDensities"]
						| "defaults";
					widths?: never;
			  }
		);

	export let field: $$Props["field"];
	export let imgixParams: $$Props["imgixParams"] = {};
	export let alt: $$Props["alt"] = undefined;
	export let fallbackAlt: $$Props["fallbackAlt"] = undefined;
	export let width: $$Props["width"] = undefined;
	export let height: $$Props["width"] = undefined;
	export let widths: $$Props["widths"] = undefined;
	export let pixelDensities: $$Props["pixelDensities"] = undefined;

	let src: string | undefined = undefined;
	let srcset: string | undefined = undefined;
	let resolvedWidth: $$Props["width"] = undefined;
	let resolvedHeight: $$Props["height"] = undefined;

	$: {
		if (isFilled.imageThumbnail(field)) {
			const castInt = (
				input: string | number | null | undefined,
			): number | null | undefined => {
				if (
					typeof input === "number" ||
					typeof input === "undefined" ||
					input === null
				) {
					return input;
				} else {
					const parsed = Number.parseInt(input);

					if (Number.isNaN(parsed)) {
						return undefined;
					} else {
						return parsed;
					}
				}
			};

			const ar = field.dimensions.width / field.dimensions.height;

			const castedWidth = castInt(width);
			const castedHeight = castInt(height);

			resolvedWidth = castedWidth ?? field.dimensions.width;
			resolvedHeight = castedHeight ?? field.dimensions.height;

			if (castedWidth != null && castedHeight == null) {
				resolvedHeight = castedWidth / ar;
			} else if (castedWidth == null && castedHeight != null) {
				resolvedWidth = castedHeight * ar;
			}

			if (widths || !pixelDensities) {
				const res = asImageWidthSrcSet(field, {
					...imgixParams,
					widths: widths === "defaults" ? undefined : widths,
				});

				src = res.src;
				srcset = res.srcset;
			} else if (pixelDensities) {
				const res = asImagePixelDensitySrcSet(field, {
					...imgixParams,
					pixelDensities:
						pixelDensities === "defaults" ? undefined : pixelDensities,
				} as ImgixURLParams);

				src = res.src;
				srcset = res.srcset;
			}
		}
	}
</script>

<!--
  @component
  Component to render a Prismic image field as an `img` element with `width`, `height`, `alt`, `src`, and `srcset` attributes.

  @example Rendering an image field:
	```svelte
		<PrismicImage
			field={document.data.example_image}
			imgixParams={{ sat: -100 }}
		/>
	```
-->

{#if isFilled.imageThumbnail(field)}
	<img
		{src}
		{srcset}
		alt={alt ?? (field.alt || fallbackAlt)}
		width={resolvedWidth}
		height={resolvedHeight}
		{...$$restProps}
	/>
{/if}
