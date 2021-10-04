<script lang="ts">
    import * as prismic from '@prismicio/client'
    import { goto } from '$app/navigation'
    import { onMount } from "svelte"

    export let linkResolver:any
    export let repositoryName:string
    export let defaultURL:string

    const endpoint = prismic.getEndpoint(repositoryName)
    const client = prismic.createClient(endpoint)

    onMount(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const previewToken = urlParams.get("token")
      const documentID = urlParams.get("documentId")
      if(documentID && previewToken) {
        const redirect = await client.resolvePreviewURL({documentID, defaultURL, previewToken, linkResolver})
        // const redirect = await client.getPreviewResolver(token, documentId).resolve(linkResolver, '/') // This generates the URL of the preview document
        await goto(redirect) // This does a client-side redirect to that URL
        return
      }
      console.log("Could not resolve preview URL.")
      // TODO: Handle else
  })
</script>