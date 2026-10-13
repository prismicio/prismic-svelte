<!-- This file is a custom paragraph component to be used in tests. -->

<script lang="ts">
	import type { Snippet } from "svelte"

	const { children }: { children: Snippet } = $props()
</script>

<p class="paragraph">{@render children()}</p>
