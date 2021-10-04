<script lang="ts">
  import SliceZone from "$lib/components/SliceZone.svelte"
  import PrismicLink from "$lib/components/PrismicLink.svelte";
  import prismic from "./prismic"

  const client = prismic.createClient({fetch})
  const promise = client.getAllByType("post")

  const get = async () => {
    const posts = await client.getAllByType("post")
    const post = posts[0]
  }
  
  get()
</script>

<h1>SliceZone</h1>

{#await promise}
  Loading...
{:then response}
  <PrismicLink prefetch field={response[0].data.author} linkResolver={(doc) => "/" + doc.uid}>Woop woop</PrismicLink>
  {JSON.stringify(prismic.asLink(response[0].data.author, (doc) => "/" + doc.uid), null, 2)}
{:catch error}
  {JSON.stringify(error)}
{/await}

<SliceZone />
