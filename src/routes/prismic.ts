import { configurePrismic } from "$lib";

  const prismic = configurePrismic({
  repositoryName: "sam-onboarding-nuxt-blog", 
  routes: [{
    type: "post", 
    path: "/:uid"
  }
]})

export default prismic