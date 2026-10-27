<script lang="ts">
	import type { Snippet } from "svelte"

	const { sliceId, children }: { sliceId: string; children: Snippet } = $props()

	const id = $derived(sliceId.replaceAll(">", "&gt;"))
</script>

{@html `<!--prismic-slice-start:${id}-->`}{@render children()}{@html `<!--prismic-slice-end:${id}-->`}
