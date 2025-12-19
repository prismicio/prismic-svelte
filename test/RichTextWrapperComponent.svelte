<script lang="ts">
	import type { RichTextComponentProps } from "../src/types";

	const { children }: RichTextComponentProps = $props();
</script>

<div class="wrapper-component">{@render children()}</div>
