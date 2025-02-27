<script lang="ts">
	import type { RTAnyNode } from "@prismicio/client";

	export let type: "table" | "thead" | "tbody" | "tr" | "th" | "td";
</script>

{#if type === "table"}
	<table><slot /></table>
{:else if type === "thead"}
	<thead><slot /></thead>
{:else if type === "tbody"}
	<tbody><slot /></tbody>
{:else if type === "tr"}
	<tr><slot /></tr>
{:else if type === "th"}
	<th><slot /></th>
{:else if type === "td"}
	<td><slot /></td>
{/if}
