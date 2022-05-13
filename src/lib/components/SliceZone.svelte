<script lang="ts">
	import ErrorMessage from "./ErrorMessage.svelte";

	// pascalise function
	const pascalize = (str: string) => {
		return str.replace(/(?:^|[-_])(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
	};

	import type { SliceZone as SliceZoneType } from "@prismicio/types";
	import { usePrismic } from "./..";

	let { slices } = usePrismic();

	export let body: SliceZoneType = [];
	export { slices };
	export let showErrors: boolean = true;
</script>

{#if Object.keys(slices).length}
	{#each body as slice, i}
		<div>
			<svelte:component this={slices[pascalize(slice.slice_type)]} {slice} />
		</div>
	{:else}
		<ErrorMessage {showErrors}>
			<svelte:fragment slot="heading">Your SliceZone is empty</svelte:fragment>
			<svelte:fragment slot="message"
				>Add Slices to your document in Prismic.</svelte:fragment
			>
		</ErrorMessage>
	{/each}
{:else if body.length}
	<ErrorMessage {showErrors}>
		<svelte:fragment slot="heading"
			>You haven't passed any Slice components</svelte:fragment
		>
		<svelte:fragment slot="message"
			>Create an object of Slice components and pass them to your SliceZone with
			the prop <code>slices</code>.</svelte:fragment
		>
	</ErrorMessage>
{:else}
	<ErrorMessage {showErrors}>
		<svelte:fragment slot="heading"
			>Your SliceZone is empty, and you haven't passed any Slice components</svelte:fragment
		>
		<svelte:fragment slot="message"
			>Add Slices to your document in Prismic and pass your document's Slice
			array (usually called <code>body</code>) to the SliceZone's
			<code>body</code>
			prop. Then, create an object of Slice components and pass them to your
			SliceZone's <code>slices</code> prop.</svelte:fragment
		>
	</ErrorMessage>
{/if}
