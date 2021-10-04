<script lang="ts">
  import * as prismicH from "@prismicio/helpers"

  import type { 
    LinkField as LinkFieldType, 
    PrismicDocument as DocumentType 
  } from "@prismicio/types";

  // TODO: Add PrismicDocument Type to field typing
  export let field:LinkFieldType | null | undefined, 
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
