<script lang="ts">
	export let slice: { slice_type: string } | { type: string };
	export let dev: boolean = false;

	const type = "slice_type" in slice ? slice.slice_type : slice.type;

	if (dev)
		console.warn(
			`[SliceZone] Could not find a component for Slice type "${type}"`,
			slice,
		);
</script>

{#if dev}
	<section data-slice-zone-todo-component="" data-slice-type={type}>
		Could not find a component for Slice type &ldquo;{type}&rdquo;
	</section>
{/if}
