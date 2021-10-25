import { configurePrismic } from "$lib";

const repositoryName = "svelte-package-dev";

const slices = []

const routes = [
  {
    type: "page",
    path: "/:uid",
  }
];

const linkResolver = (doc) => `/${doc.type}/${doc.uid}`;

const prismic = configurePrismic({ repositoryName, routes, linkResolver });

export default prismic;
