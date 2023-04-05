<script lang="ts">
	const elements = {
		heading1: "h1",
		heading2: "h2",
		heading3: "h3",
		heading4: "h4",
		heading5: "h5",
		heading6: "h6",
		paragraph: "p",
		preformatted: "pre",
		strong: "strong",
		em: "em",
		list: "ul",
		oList: "ol",
		listItem: "li",
		"list-item": "li",
		oListItem: "li",
		"o-list-item": "li",
		"group-list-item": "li",
		"group-o-list-item": "li",
		label: "span",
	} as const;

	type PrismicElement = keyof typeof elements;

	export let type: PrismicElement;
	export let data: any;
</script>

<svelte:element this={elements[type]} class={data?.label || undefined}>
	<slot />
</svelte:element>
