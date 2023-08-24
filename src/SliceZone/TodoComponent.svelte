<script lang="ts">
	import { DEV } from "esm-env";

	export let slice: { slice_type: string } | { type: string };

	const type = "slice_type" in slice ? slice.slice_type : slice.type;

	if (DEV) {
		console.warn(
			`[SliceZone] Could not find a component for Slice type "${type}"`,
			slice,
		);
	}
</script>

{#if DEV}
	<section data-slice-zone-todo-component="" data-slice-type={type}>
		Could not find a component for Slice type &ldquo;{type}&rdquo;
	</section>
{/if}
