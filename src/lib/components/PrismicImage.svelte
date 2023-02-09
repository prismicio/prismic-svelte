<script lang="ts">
	import * as prismicH from "@prismicio/helpers"
	import type * as prismicT from "@prismicio/types";
	
	/**
	 * A Prismic Image field.
	 */
	export let field: prismicT.ImageField;

	/**
	 * An object of Imgix URL API parameters to transform the image.
	 *
	 * See: https://docs.imgix.com/apis/rendering
	 */
	export let imgixParams: Parameters<typeof prismicH.asImageSrc>[1] | null | undefined = null;

	/**
	 * Widths used to build a `srcset` value for the Image field.
	 *
	 * If a `widths` prop is not given or `"defaults"` is passed, the
	 * following widths will be used: 640, 750, 828, 1080, 1200, 1920, 2048,
	 * 3840.
	 *
	 * If the Image field contains responsive views, each responsive view
	 * can be used as a width in the resulting `srcset` by passing
	 * `"thumbnails"` as the `widths` prop.
	 */
	export let widths: NonNullable<Parameters<typeof prismicH.asImageWidthSrcSet>[1]>["widths"] | null | undefined = null;
				
	
	/**
	 * HTML class attribute. Use a `:global()` selector to target the class.
	 */
	let className: string | null | undefined = null;
	export { className as class };

	const params = {}
	if(widths) Object.assign(params, { widths })
	if(imgixParams) Object.assign(params, imgixParams)
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
	{@const { alt, dimensions } = field}
	{@const { width, height } = dimensions }
	{@const { src, srcset } = prismicH.asImageWidthSrcSet(field, params)}

	<img {src} {srcset} {alt} {width} {height} class={className} />
{:else}
	<img alt={field.alt || ""} class={className} />
{/if}