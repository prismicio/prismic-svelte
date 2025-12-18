<script lang="ts">
	import type { asTree } from "@prismicio/client/richtext";

	import type { RichTextComponents } from "../types";

	import Serialize from "./Serialize.svelte";

	type Props = {
		components: RichTextComponents;
		children: ReturnType<typeof asTree>["children"];
	};

	const { components, children }: Props = $props();
</script>

<Serialize {children} {components} />
