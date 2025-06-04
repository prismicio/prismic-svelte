import { RichTextComponents } from "./types";

export { default as PrismicEmbed } from "./PrismicEmbed.svelte";
export { default as PrismicImage } from "./PrismicImage.svelte";
export { default as PrismicLink } from "./PrismicLink.svelte";
export { default as PrismicRichText } from "./PrismicRichText/PrismicRichText.svelte";
export { default as PrismicTable } from "./PrismicTable/PrismicTable.svelte";
export { default as PrismicText } from "./PrismicText.svelte";
export { default as SliceZone } from "./SliceZone/SliceZone.svelte";

/**
 * @deprecated Replaced with `RichTextComponents`
 */
// TODO: Remove in v3.
export type SvelteRichTextSerializer = RichTextComponents;
export type { RichTextComponents };

export type { RichTextComponentProps, SliceComponentProps } from "./types";
