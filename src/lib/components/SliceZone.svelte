<script lang="ts">
  import TodoSliceComponent from './TodoSliceComponent.svelte'; 
  
  import type * as prismicT from "@prismicio/types"
  import type { SvelteComponent } from 'svelte';

  interface SliceComponents {
    [key: prismicT.Slice["slice_type"]]: SvelteComponent,
  }

  export let slices:prismicT.SliceZone = []
  export let components:SliceComponents = {}
  export let context:any = {}
  export let defaultComponent:SvelteComponent = TodoSliceComponent
  export let dev:Boolean = false
</script>

{#each slices as slice, i}
  {@const {slice_type} = slice}
  {@const component = components[slice_type]}
  {#if component}
    <svelte:component this={component} {slice} {slices} {context} {i} />
  {:else if dev}
    <svelte:component this={defaultComponent} {slice} />
  {/if}
{:else}
  <p>No Slices found.</p>
{/each}

