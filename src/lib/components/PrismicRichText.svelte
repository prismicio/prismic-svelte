<script lang="ts">
  import * as prismicH from "@prismicio/helpers"
  import { usePrismic } from "./..";

  import type { RichTextField as RichTextFieldType } from "@prismicio/types";
  import type { TitleField as TitleFieldType } from "@prismicio/types";

  let { htmlSerializer, linkResolver } = usePrismic()

  export let field:TitleFieldType | RichTextFieldType
  export { htmlSerializer, linkResolver }
</script>

{@html prismicH.asHTML(field, linkResolver, htmlSerializer)}
