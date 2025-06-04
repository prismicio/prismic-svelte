<script lang="ts">
	import { DEV } from "esm-env";

	type Props = {
		slice: { slice_type: string } | { type: string };
	};

	const { slice }: Props = $props();

	const type = $derived("slice_type" in slice ? slice.slice_type : slice.type);

	$effect(() => {
		if (DEV) {
			console.warn(
				`[SliceZone] Could not find a component for Slice type "${type}"`,
				$state.snapshot(slice),
			);
		}
	});
</script>

{#if DEV}
	<section data-slice-zone-todo-component="" data-slice-type={type}>
		Could not find a component for Slice type &ldquo;{type}&rdquo;
	</section>
{/if}
