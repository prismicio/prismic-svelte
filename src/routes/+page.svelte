<script lang="ts">
  import type * as prismicT from "@prismicio/types"
  import { SliceZone, PrismicLink, PrismicImage, PrismicRichText, PrismicText } from "$lib";
  import { RichText, CodeSnippet } from "$lib/slices"
	import type { PrismicDocumentHeader } from "@prismicio/types";

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
        example_title: prismicT.TitleField;
				example_link: prismicT.LinkField;
        example_image: prismicT.ImageField;
			};
		};
	}
  
  export let data: Data

</script>

<main>
  <h1>Example Fields</h1>
  <hr />
  <PrismicText field={data.exampleDocument.data.example_rich_text} />
  <hr />
  <PrismicRichText field={data.exampleDocument.data.example_title} />
  <hr />
  <PrismicRichText field={data.exampleDocument.data.example_rich_text} />
  <PrismicImage field={data.exampleDocument.data.example_image} imgixParams={{ sat: -100 }} />
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