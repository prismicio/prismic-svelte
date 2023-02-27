<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";
	import { __PRODUCTION__ } from "$lib/__PRODUCTION__";

	type PrismicLinkProps = {
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
		// alt: undefined;
		/**
		 * Declare an image as decorative only if the Image field does not have
		 * alternative text by providing `fallbackAlt=""`.
		 *
		 * See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
		 */
		// fallbackAlt?: "";
	};

	type $$Props = Omit<svelteHTML.IntrinsicElements["img"], "alt"> &
		PrismicLinkProps;

	export let field: $$Props["field"];

	export let imgixParams: $$Props["imgixParams"] = {};

	export let widths: $$Props["widths"] = undefined;

	export let pixelDensities: $$Props["pixelDensities"] = undefined;

	export let width: $$Props["width"] = undefined;

	export let height: $$Props["height"] = undefined;

	// export let alt: $$Props["alt"] = undefined;

	// export let fallbackAlt: $$Props["fallbackAlt"] = undefined;

	const defaultWidths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

	if (!__PRODUCTION__) {
		if (widths && pixelDensities) {
			console.warn(
				`[PrismicImage] Only one of "widths" or "pixelDensities" props can be provided. You can resolve this warning by removing either the "widths" or "pixelDensities" prop. "widths" will be used in this case.`,
			);
		}

		// if (typeof alt === "string" && alt !== "") {
		// 	console.warn(
		// 		`[PrismicImage] The "alt" prop can only be used to declare an image as decorative by passing an empty string (alt="") but was provided a non-empty string. You can resolve this warning by removing the "alt" prop or changing it to alt="".`,
		// 	);
		// }

		// if (typeof fallbackAlt === "string" && fallbackAlt !== "") {
		// 	console.warn(
		// 		`[PrismicImage] The "fallbackAlt" prop can only be used to declare an image as decorative by passing an empty string (fallbackAlt="") but was provided a non-empty string. You can resolve this warning by removing the "fallbackAlt" prop or changing it to fallbackAlt="".`,
		// 	);
		// }
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
						pixelDensities === "defaults" ? [1, 2, 3] : pixelDensities,
					...imgixParams,
			  })
			: prismicH.asImageWidthSrcSet(field, {
					widths: widths === "defaults" ? defaultWidths : widths,
					...imgixParams,
			  })}

	<img
		{src}
		{srcset}
		alt={field.alt}
		width={width || (!height ? field.dimensions.width : undefined)}
		height={height || (!width ? field.dimensions.height : undefined)}
		{...$$restProps}
	/>
{:else}
	<img alt={field.alt || ""} {...$$restProps} />
{/if}
