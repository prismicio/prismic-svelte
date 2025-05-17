<script lang="ts">
	import {
		type ImageFieldImage,
		asImagePixelDensitySrcSet,
		asImageWidthSrcSet,
		isFilled,
	} from "@prismicio/client";
	import type { ImgixURLParams } from "imgix-url-builder";
	import type { HTMLImgAttributes } from "svelte/elements";

	type Props = Omit<HTMLImgAttributes, "src" | "srcset" | "alt"> & {
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

	const {
		field,
		imgixParams = {},
		alt,
		fallbackAlt,
		width,
		height,
		widths,
		pixelDensities,
		...restProps
	}: Props = $props();

	const { resolvedWidth, resolvedHeight } = $derived.by(() => {
		if (!isFilled.imageThumbnail(field))
			return { resolvedWidth: undefined, resolvedHeight: undefined };

		const ar = field.dimensions.width / field.dimensions.height;

		let resolvedWidth = castInt(width) ?? field.dimensions.width;
		let resolvedHeight = castInt(height) ?? field.dimensions.height;
		if (resolvedWidth != null && resolvedHeight == null) {
			resolvedHeight = resolvedWidth / ar;
		} else if (resolvedWidth == null && resolvedHeight != null) {
			resolvedWidth = resolvedHeight * ar;
		}

		return { resolvedWidth, resolvedHeight };
	});

	const { src, srcset } = $derived.by(() => {
		if (!isFilled.imageThumbnail(field))
			return { src: undefined, srcset: undefined };

		if (pixelDensities) {
			return asImagePixelDensitySrcSet(field, {
				...imgixParams,
				pixelDensities:
					pixelDensities === "defaults" ? undefined : pixelDensities,
			} as ImgixURLParams);
		}

		return asImageWidthSrcSet(field, {
			...imgixParams,
			widths: widths === "defaults" ? undefined : widths,
		});
	});

	function castInt(
		input: string | number | null | undefined,
	): number | null | undefined {
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
		{...restProps}
	/>
{/if}
