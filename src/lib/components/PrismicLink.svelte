<script lang="ts">
	import * as prismicH from "@prismicio/helpers";
	import type * as prismicT from "@prismicio/types";

	import { usePrismic } from "../usePrismic";

	// const defaultBlankTargetRelAttribute = "noopener noreferrer";

	export let field:
			| prismicT.LinkField
			| prismicT.PrismicDocument
			| null
			| undefined,
		linkResolver: prismicH.LinkResolverFunction | null | undefined,
		download: boolean | null | undefined,
		hreflang: string | undefined,
		referrerpolicy: string | undefined,
		rel: string | undefined,
		target: string | undefined,
		type: string | undefined,
		prefetch: true | undefined,
		noscroll: true | undefined;

	const setRel = () => {
		let rels: string[] = [];
		const defaultBlankTargetRelAttribute = ["noopener", "noreferrer"];
		if (rel) rels.push(...rel?.split(" "));
		if (
			(field && "target" in field && field?.target === "_blank") ||
			target === "_blank"
		)
			defaultBlankTargetRelAttribute.forEach((item) => {
				if (!rels.includes(item)) rels.push(item);
			});
		if (
			field &&
			"link_type" in field &&
			field?.link_type === "Web" &&
			!rels.includes("external")
		)
			rels.push("external");
		return rels.join(" ");
	};

	const attrs = {
		download,
		hreflang,
		referrerpolicy,
		target: target || field?.target || undefined,
		rel: setRel(),
		type,
	};

	const link: string | null = field
		? prismicH.asLink(field, linkResolver || usePrismic().linkResolver)
		: "";
	const href: string = link || "";
</script>

<a
	{href}
	{...attrs}
	sveltekit:prefetch={prefetch}
	sveltekit:noscroll={noscroll}
>
	<slot />
</a>
