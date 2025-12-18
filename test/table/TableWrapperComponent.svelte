<script lang="ts">
	import type { TableField } from "@prismicio/client";
	import type { Snippet } from "svelte";

	const { table, children }: { table: TableField<"filled">; children: Snippet } = $props();
</script>

<div class="wrapper-table">{@render children()}</div>

