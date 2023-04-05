<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import type { RichTextField } from "@prismicio/types";
	import {
		asTree,
		wrapMapSerializer,
		type RichTextFunctionSerializer,
		type RichTextMapSerializer,
		type TreeNode,
	} from "@prismicio/richtext";

	import Serialize from "./Serialize.svelte";

	export let field: RichTextField = [];
	export let serializer:
		| RichTextMapSerializer<typeof SvelteComponent, TreeNode>
		| RichTextFunctionSerializer<typeof SvelteComponent, TreeNode>
		| undefined = undefined;

	const resolvedSerializer =
		typeof serializer === "object" ? wrapMapSerializer(serializer) : serializer;

	const nodes = asTree(field).children;
</script>

<Serialize {nodes} serializer={resolvedSerializer} />
