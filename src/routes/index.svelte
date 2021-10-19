<script context="module" lang="ts">
  import type * as prismicT from "@prismicio/types"
  import * as slices from "./slices"

	import { usePrismic } from "$lib";
  import { PrismicEmbed, PrismicImage, PrismicLink, PrismicRichText, PrismicText, SliceZone } from "$lib";

	const { client } = usePrismic();

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