<script lang="ts">
  import * as prismicH from "@prismicio/helpers"
  import type * as prismicT from "@prismicio/types"

  export let slice:prismicT.Slice
</script>

<pre>
  {@html prismicH.asHTML(slice.primary.content)}
</pre>

<style>
  pre {
    background: #222;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }
</style>