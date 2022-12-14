<script context="module" lang="ts">
  import type * as prismicT from "@prismicio/types"
  import { SliceZone } from "$lib";
  import {RichText, CodeSnippet} from "./slices"

  const components = {
    rich_text: RichText,
    code_snippet: CodeSnippet
  }
</script>

<script lang="ts">
  export let document:prismicT.PrismicDocument
</script>

<main>
  <h1>Welcome to SvelteKit</h1>
  <SliceZone slices={document.data.body} {components} />
</main>

<style>
  main {
    max-width: min(90%, 800px);
    margin: auto;
  }
</style>