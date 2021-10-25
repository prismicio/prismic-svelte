<script lang="ts">
  import * as prismicH from "@prismicio/helpers"
  import { usePrismic } from "./..";

  import type { RichTextField as RichTextFieldType } from "@prismicio/types";
  import type { TitleField as TitleFieldType } from "@prismicio/types";


  export let field:TitleFieldType | RichTextFieldType
  export let htmlSerializer:any = usePrismic().htmlSerializer
  export let linkResolver:any = usePrismic().linkResolver
</script>

{@html prismicH.asHTML(field, linkResolver, htmlSerializer)}
