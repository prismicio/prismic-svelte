<script lang="ts">
  import type * as prismicT from "@prismicio/types"

  export let slice:prismicT.Slice

  const { slice_type } = slice

  console.warn(
    `[SliceZone] Could not find a component for Slice type "${slice_type}"`,
    slice,
  )
</script>

<section data-slice-zone-todo-component="" data-slice-type={slice_type}>
  Could not find a component for Slice type &ldquo;{slice_type}&rdquo;
</section>