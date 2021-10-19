<script lang="ts">
	import * as prismicT from "@prismicio/types";
	export let field: prismicT.ImageField;
	let className: string;

	// creates a `class` property, even
	// though it is a reserved word
	export { className as class };

	const usePrismicImage = (
		field: prismicT.ImageField,
	): {
		url: string;
		width?: number;
		height?: number;
		alt?: string;
		copyright: string | undefined;
	} => {
		field.url;
		return {
			url: field.url || "",
			alt: field.alt || "",
			width: field.dimensions?.width || undefined,
			height: field.dimensions?.height || undefined,
			copyright: field.copyright || undefined,
		};
	};

	const image = usePrismicImage(field);
</script>

{#if field.url}
	<img src={image.url} alt={image.alt} height={image.height} />
{/if}
