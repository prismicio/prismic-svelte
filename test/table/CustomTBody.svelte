<!-- This file is a custom tbody component to be used in tests. -->

<script lang="ts">
	import type { Snippet } from "svelte"

	const { children }: { children: Snippet } = $props()
</script>

<div class="body">{@render children()}</div>
