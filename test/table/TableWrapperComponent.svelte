<script lang="ts">
	import type { Snippet } from "svelte";

	const { children }: { children: Snippet } = $props();
</script>

<div class="wrapper-table">{@render children()}</div>
