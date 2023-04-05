<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";
	import { __PRODUCTION__ } from "$lib/__PRODUCTION__";

	type PrismicImageProps = {
		/**
		 * A Prismic Image field.
		 */
		field: prismicT.ImageField;
		/**
		 * An object of Imgix URL API parameters to transform the image.
		 *
		 * See: https://docs.imgix.com/apis/rendering
		 */
		imgixParams?: Parameters<typeof prismicH.asImageSrc>[1];
		/**
		 * Widths used to build a `srcset` value for the Image field.
		 *
		 * If a `widths` prop is not given or `"defaults"` is passed, the following
		 * widths will be used: 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
		 *
		 * If the Image field contains responsive views, each responsive view can be
		 * used as a width in the resulting `srcset` by passing `"thumbnails"` as
		 * the `widths` prop.
		 */
		widths?:
			| NonNullable<Parameters<typeof prismicH.asImageWidthSrcSet>[1]>["widths"]
			| "defaults";
		/**
		 * Pixel densities used to build a `srcset` value for the Image field.
		 *
		 * If a `pixelDensities` prop is passed `"defaults"`, the following pixel
		 * densities will be used: 1, 2, 3.
		 */
		pixelDensities?:
			| NonNullable<
					Parameters<typeof prismicH.asImagePixelDensitySrcSet>[1]
			  >["pixelDensities"]
			| "defaults";
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
	};

	type $$Props = Omit<svelteHTML.IntrinsicElements["img"], "alt"> &
		PrismicImageProps;

	export let field: $$Props["field"];

	export let imgixParams: $$Props["imgixParams"] = {};

	export let widths: $$Props["widths"] = undefined;

	export let pixelDensities: $$Props["pixelDensities"] = undefined;

	export let width: $$Props["width"] = undefined;

	export let height: $$Props["height"] = undefined;

	export let alt: $$Props["alt"] = undefined;

	export let fallbackAlt: $$Props["fallbackAlt"] = undefined;

	const castInt = (
		input: string | number | null | undefined,
	): number | undefined | null => {
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

	const ar =
		field.dimensions && field.dimensions.width / field.dimensions.height;

	const castedWidth = castInt(width);
	const castedHeight = castInt(height);

	let resolvedWidth =
		castedWidth ?? (field.dimensions && field.dimensions.width);
	let resolvedHeight =
		castedHeight ?? (field.dimensions && field.dimensions.height);

	if (
		ar &&
		castedWidth != null &&
		(castedHeight == null || typeof castedWidth !== "undefined")
	) {
		resolvedHeight = castedWidth / ar;
	} else if (
		ar &&
		castedHeight != null &&
		(castedWidth == null || typeof castedWidth !== "undefined")
	) {
		resolvedWidth = castedHeight * ar;
	}

	if (!__PRODUCTION__) {
		if (widths && pixelDensities) {
			console.warn(
				`[PrismicImage] Only one of "widths" or "pixelDensities" props can be provided. You can resolve this warning by removing either the "widths" or "pixelDensities" prop. "widths" will be used in this case.`,
			);
		}

		if (typeof alt === "string" && alt !== "") {
			console.warn(
				`[PrismicImage] The "alt" prop can only be used to declare an image as decorative by passing an empty string (alt="") but was provided a non-empty string. You can resolve this warning by removing the "alt" prop or changing it to alt="".`,
			);
		}

		if (typeof fallbackAlt === "string" && fallbackAlt !== "") {
			console.warn(
				`[PrismicImage] The "fallbackAlt" prop can only be used to declare an image as decorative by passing an empty string (fallbackAlt="") but was provided a non-empty string. You can resolve this warning by removing the "fallbackAlt" prop or changing it to fallbackAlt="".`,
			);
		}
	}
</script>

<!-- 
  @component
  Component to render a Prismic Image field as an `img` element with `width`, `height`, `alt`, `src`, and `srcset` attributes.
  
  @example Rendering an Image field:
	```svelte
		<PrismicImage 
			field={document.data.example_image} 
			imgixParams={{ sat: -100 }}
		/>
  ```
-->

{#if prismicH.isFilled.image(field)}
	{@const { src, srcset } =
		pixelDensities && !widths
			? prismicH.asImagePixelDensitySrcSet(field, {
					pixelDensities:
						pixelDensities === "defaults" ? undefined : pixelDensities,
					...imgixParams,
			  })
			: prismicH.asImageWidthSrcSet(field, {
					widths: widths === "defaults" ? undefined : widths,
					...imgixParams,
			  })}

	<img
		{src}
		{srcset}
		alt={alt ?? field.alt ?? fallbackAlt}
		width={width || height ? resolvedWidth : field.dimensions.width}
		height={height || (width ? resolvedHeight : field.dimensions.height)}
		{...$$restProps}
	/>
{:else}
	<img alt={field.alt || ""} {...$$restProps} />
{/if}
