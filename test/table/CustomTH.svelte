<!-- This file is a custom th component to be used in tests. -->

<script lang="ts">
	import type { Snippet } from "svelte"

	const { children }: { children: Snippet } = $props()
</script>

<div class="header">{@render children()}</div>
