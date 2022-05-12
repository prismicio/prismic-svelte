<script context="module" lang="ts">
  import type * as prismicT from "@prismicio/types"
  import { SliceZone, PrismicLink, PrismicRichText } from "$lib";
  import * as components from "./slices"
  
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
  <PrismicLink rel="doggo" field={document.data["test-link"]}>
    This is a link.
  </PrismicLink>
  <PrismicRichText field={document.data["test-rich-text"]} />
  <SliceZone slices={document.data.body} {components} />
</main>

<style>
  main {
    max-width: min(90%, 800px);
    margin: auto;
  }
</style>