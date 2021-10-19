<script>
	import * as prismic from "@prismicio/client";
	import { PrismicProvider } from "$lib"; // @prismicio/svelte in production

	const endpoint = prismic.getEndpoint("svelte-package-dev");
	const client = prismic.createClient(endpoint);

	const linkResolver = (doc) => `/${doc.type}/${doc.uid}`;
</script>

<PrismicProvider {client} {linkResolver}>
	<slot />
</PrismicProvider>
