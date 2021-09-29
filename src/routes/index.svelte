<script lang="ts">
  import SliceZone from "$lib/SliceZone.svelte"
  import PrismicLink from "$lib/PrismicLink.svelte";
  import * as prismic from "@prismicio/client"
  import { configurePrismic } from "$lib";
  import type {PrismicDocument as DocumentType} from "@prismicio/client"
  import { documentAsLink } from "@prismicio/helpers";

  const prismic = configurePrismic({
    repositoryName: "sam-onboarding-nuxt-blog", 
    routes: [{
      type: "post", 
      path: "/:uid"
    }
  ]})

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