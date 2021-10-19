<script lang="ts">
  import * as prismicH from "@prismicio/helpers"
  import * as prismicT from "@prismicio/types"

  // TODO: Merge changes
  export let field:prismicT.LinkField | prismicT.PrismicDocument | null | undefined, 
    linkResolver:any | null | undefined, 
    download:boolean | null | undefined, 
    hreflang:string | undefined,
    referrerpolicy:string |undefined,
    rel:string | undefined,
    target:string | undefined,
    type:string | undefined,
    prefetch:true | undefined,
    noscroll:true | undefined

  const attrs = {
    download,
    hreflang,
    referrerpolicy,
    rel: (field?.link_type === "External" && !rel && "external") || rel,
    target,
    type,
  }

  const link:string | null = field ? prismicH.asLink(field, linkResolver) : ""
  const href:string = link || ""
</script>

<a 
  {href}
  {...attrs} 
  sveltekit:prefetch={prefetch}
  sveltekit:noscroll={noscroll}
>
  <slot></slot>
</a>

<!-- 
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
-->
