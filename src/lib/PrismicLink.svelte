<script lang="ts">
  import * as prismicH from "@prismicio/helpers"

  import type { 
    LinkField as LinkFieldType, 
    PrismicDocument as DocumentType 
  } from "@prismicio/types";

  // TODO: Add PrismicDocument Type to field typing
  export let field:LinkFieldType | null | undefined
  export let linkResolver:any | null | undefined
  export let download:boolean | null | undefined
  export let hreflang:string | undefined
  export let referrerpolicy:string |undefined 
  export let rel:string | undefined
  export let target:string | undefined
  export let type:string | undefined
  export let prefetch:true | undefined
  export let noscroll:true | undefined

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