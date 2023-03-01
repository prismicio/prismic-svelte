<script lang="ts">
	import RichTextChild from "./RichTextChild.svelte";

	export let tree: any;
	export let map: any;
</script>

{#each tree.children as branch}
	<RichTextChild {map} tree={branch} />
{:else}
	{tree.text}
{/each}
