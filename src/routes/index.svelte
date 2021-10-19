<script context="module" lang="ts">
  import type * as prismicT from "@prismicio/types"
  import * as slices from "./slices"

	import { usePrismic } from "$lib";
  import { PrismicEmbed, PrismicImage, PrismicLink, PrismicRichText, PrismicText, SliceZone } from "$lib";

  import * as prismic from "@prismicio/client"
  const repoName = "svelte-package-dev"
  const endpoint = prismic.getEndpoint(repoName)
  const client = prismic.createClient(endpoint)

	// const { client } = usePrismic();

  export async function load() {
    const document = await client.getSingle('homepage');
    return {
      props: {
        document,
      }
    };
  }
</script>

<script lang="ts">
  export let document:prismicT.PrismicDocument
</script>

<main>
  <h1>Welcome to SvelteKit</h1>
  <SliceZone body={document.data.body} {slices} />
</main>

<style>
  main {
    max-width: min(90%, 800px);
    margin: auto;
  }
</style>