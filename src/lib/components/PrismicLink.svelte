<script lang="ts">
	import * as prismicT from "@prismicio/types";
	import * as prismicH from "@prismicio/helpers";

	import { usePrismic } from "../usePrismic";

	const defaultBlankTargetRelAttribute = "noopener noreferrer";

	export let field: prismicT.LinkField | prismicT.PrismicDocument;
	export let linkResolver: prismicH.LinkResolverFunction | undefined =
		undefined;

	const usePrismicLink = (
		field: prismicT.LinkField | prismicT.PrismicDocument,
		linkResolver?: prismicH.LinkResolverFunction,
	): {
		href: string;
		target?: string;
		rel?: string;
	} => {
		const href =
			prismicH.asLink(field, linkResolver || usePrismic().linkResolver) || "";
		const target = "target" in field ? field.target : undefined;
		const rel =
			target === "_blank" ? defaultBlankTargetRelAttribute : undefined;

		return { href, target, rel };
	};

	$: link = usePrismicLink(field, linkResolver);
</script>

<a href={link.href} target={link.target} rel={link.rel}><slot /></a>
