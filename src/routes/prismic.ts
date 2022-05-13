import { configurePrismic } from "$lib";
import * as slices from "./slices";

const repositoryName = "svelte-package-dev";

const routes = [
	{
		type: "page",
		path: "/:uid",
	},
];

const linkResolver = (doc) => `/${doc.type}/${doc.uid}`;

const htmlSerializer = () => null;

const prismic = configurePrismic({
	repositoryName,
	routes,
	linkResolver,
	slices,
	htmlSerializer,
});

export default prismic;
