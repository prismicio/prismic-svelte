<script lang="ts">
  import PrismicPreview from "$lib/components/PrismicPreview.svelte";
  import prismic from "./prismic"

  const client = prismic.createClient({fetch})
  const defaultURL = "/"
  const linkResolver = (doc:any) => "/" + doc.uid
</script>

<PrismicPreview {client} {defaultURL} {linkResolver}>
  Loading preview...
</PrismicPreview>