<!-- This file is a custom table component to be used in tests. -->

<script lang="ts">
	import type { Snippet } from "svelte"

	const { children }: { children: Snippet } = $props()
</script>

<div class="table">{@render children()}</div>
