<script lang="ts">
  import TodoSliceComponent from './TodoSliceComponent.svelte'; 
  
  import type * as prismicT from "@prismicio/types"
  import type { SvelteComponent } from 'svelte';

  type SliceComponents = Record<string, SvelteComponent | (new (...args: any[]) => SvelteComponent)>

  /**
   * The minimum required properties to represent a Prismic Slice from the Prismic
   * Rest API V2 for the `<SliceZone>` component.
   *
   * If using Prismic's Rest API V2, use the `Slice` export from
   * `@prismicio/types` for a full interface.
   *
   * @typeParam SliceType - Type name of the Slice.
   */
  type SliceLikeRestV2<SliceType extends string = string> = {
    slice_type: prismicT.Slice<SliceType>["slice_type"];
  };

  /**
   * The minimum required properties to represent a Prismic Slice from the Prismic
   * GraphQL API for the `<SliceZone>` component.
   *
   * @typeParam SliceType - Type name of the Slice.
   */
  type SliceLikeGraphQL<SliceType extends string = string> = {
    type: prismicT.Slice<SliceType>["slice_type"];
  };

  /**
   * The minimum required properties to represent a Prismic Slice for the
   * `<SliceZone>` component.
   *
   * If using Prismic's Rest API V2, use the `Slice` export from
   * `@prismicio/types` for a full interface.
   *
   * @typeParam SliceType - Type name of the Slice.
   */
  type SliceLike<SliceType extends string = string> =
    | SliceLikeRestV2<SliceType>
    | SliceLikeGraphQL<SliceType>;


  export let slices:SliceLike[] = []
  export let components:SliceComponents = {}
  export let context:any = {}
  export let defaultComponent:SvelteComponent | (new (...args: any[]) => SvelteComponent) | undefined = undefined
  export let dev:boolean = false
</script>

{#each slices as slice, index}
  {@const type = "slice_type" in slice ? slice.slice_type : slice.type }
  {@const Component = components[type] || defaultComponent}
  {#if Component}
    <svelte:component this={Component} {slice} {slices} {context} {index} />
  {:else}
    <TodoSliceComponent {slice} {dev} />
  {/if}
{/each}
