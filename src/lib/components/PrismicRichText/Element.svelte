<script lang="ts">
	type Elements = {
		[index: string]: TypeType;
	};

	const elements: Elements = {
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
		span: "span",
	};

	const types = Object.keys(elements);

	type TypeType = (typeof types)[number];

	export let type: TypeType;
</script>

<svelte:element this={elements[type]}>
	<slot />
</svelte:element>
