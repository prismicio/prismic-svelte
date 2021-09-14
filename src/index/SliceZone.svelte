<script>
  import { pascalize } from 'sm-commons/utils/str'

  export let body, slices
</script>



{#if !slices.length}
  {#each body as slice, i}
    <div>
      <svelte:component slice={slice} this={slices[pascalize(slice.slice_type)]}/>
    </div>
  {:else}
    <p>Your SliceZone is empty.</p>
  {/each}
{:else}
    <p>You haven't defined any Slice components.</p>
{/if}