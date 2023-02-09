<script lang="ts">
  import * as prismicH from "@prismicio/helpers"
  import type * as prismicT from "@prismicio/types";

  /**
	 * A Prismic Rich Text or Title field.
	 */
  export let field:prismicT.TitleField | prismicT.RichTextField

  /**
	 * The separator used between blocks. Defaults to `\n`.
   * Newlines will not render unless `white-space: pre-line` is 
   * applied with CSS.
	 */
  export let separator:string | undefined = `\n`;
</script>

{@html prismicH.asText(field, separator)}