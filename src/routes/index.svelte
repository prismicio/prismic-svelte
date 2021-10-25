<script context="module" lang="ts">
  import type * as prismicT from "@prismicio/types"
  import * as slices from "./slices"
  import { SliceZone } from "$lib";
  
  export async function load({ stuff, fetch }) {
    const { prismic } = stuff
    
    const client = prismic.clientWithFetch(fetch)
    
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
  <SliceZone body={document.data.body} />
</main>

<style>
  main {
    max-width: min(90%, 800px);
    margin: auto;
  }
</style>