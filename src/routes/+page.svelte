<script lang="ts">
  import type prismicT from "@prismicio/types"
  import { SliceZone, PrismicLink } from "$lib";
  import { RichText, CodeSnippet } from "$lib/slices"
  // import type { PageData } from './$types'

  const components = {
    rich_text: RichText,
    code_snippet: CodeSnippet
  }

  
  interface Data {
    tutorialDocument: {
      data: {
        body: []
      }
    },
		exampleDocument: {
      data: {
        example_rich_text: prismicT.RichTextField;
				example_link: prismicT.LinkField;
			};
		};
	}
  
  export let data: Data

</script>

<main>
  <h1>Example Fields</h1>
  <PrismicLink field={data.exampleDocument.data.example_link}>Link</PrismicLink>
  <h1>Example Slice Zone</h1>
  <SliceZone slices={data.tutorialDocument.data.body} {components} />
</main>

<style>
  main {
    max-width: min(90%, 800px);
    margin: auto;
  }
</style>