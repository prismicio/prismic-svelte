<script lang="ts">
  import { PrismicRichText } from "$lib";

  export let slice
</script>

<pre>
  <PrismicRichText field={slice.primary.content} />
</pre>

<style>
  pre {
    background: #222;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }
</style>