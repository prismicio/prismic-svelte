<script>
	import * as prismicM from "@prismicio/mock";

	import { PrismicLink } from "$lib";

	const links = {
		empty: {
			link_type: "Any",
		},
		simple: {
			link_type: "Web",
			url: "https://en.wikipedia.org/wiki/Atlantic_puffin#Behaviour",
		},
		blank: {
			link_type: "Web",
			url: "https://en.wikipedia.org/wiki/Atlantic_puffin#Behaviour",
			target: "_blank",
		},
		internal: {
			id: "XvoFFREAAM0WGBng",
			type: "page",
			tags: [],
			slug: "slug",
			lang: "en-us",
			uid: "test",
			link_type: "Document",
			isBroken: false,
		},
	};

	const mockedLink = prismicM.value.link({ withTargetBlank: true });

	const linkResolver = (doc) => `/custom/${doc.type}/${doc.uid}`;
</script>

<ul>
	<li>
		<PrismicLink field={links.simple}>external</PrismicLink>
	</li>
	<li>
		<PrismicLink field={links.blank}>external blank</PrismicLink>
	</li>
	<li>
		<PrismicLink field={links.internal}>internal</PrismicLink>
	</li>
	<li>
		<PrismicLink field={links.internal} {linkResolver}>
			internal custom link resolver
		</PrismicLink>
	</li>
	<li>
		<PrismicLink field={mockedLink}>mocked link</PrismicLink>
	</li>
</ul>
