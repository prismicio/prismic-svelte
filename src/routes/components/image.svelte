<script>
	import { PrismicImage } from "$lib";

	const fields = {
		full: {
			url: "https://via.placeholder.com/150",
			dimensions: {
				width: 100,
				height: 100,
			},
			alt: "Hey",
			copyright: "Mine",
		},
		light: {
			url: "https://via.placeholder.com/150",
			dimensions: {
				width: 100,
				height: 100,
			},
		},
	};
</script>

<PrismicImage field={fields.full} />
<PrismicImage field={fields.light} />
