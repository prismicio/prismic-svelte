<script lang="ts">
	const {
		slice,
		label,
	}: {
		slice?: { slice_type?: string; type?: string }
		label?: string
	} = $props()
	const kind = $derived(slice?.slice_type ?? slice?.type ?? label)
</script>

{#if kind !== "empty"}<span>{kind}</span><span>content</span>{/if}
