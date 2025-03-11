<script lang="ts">
	import type { TableComponents } from "../types";
	export let type: keyof TableComponents;
</script>

<svelte:element this={type}><slot /></svelte:element>
