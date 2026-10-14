<script lang="ts">
	import {
		SimulatorManager,
		StateEventType,
		disableEventHandler,
		getDefaultMessage,
		getDefaultProps,
		getDefaultSlices,
		onClickHandler,
		simulatorClass,
		simulatorRootClass,
	} from "@prismicio/simulator/kit"

	const defaultProps = getDefaultProps()

	type Props = {
		zIndex?: number
		background?: string
		class?: string
	}

	const {
		zIndex = defaultProps.zIndex,
		background = defaultProps.background,
		class: className,
	}: Props = $props()

	let slices = $state.raw(getDefaultSlices())
	let message = $state(getDefaultMessage())

	if (typeof window !== "undefined") {
		const simulatorManager = new SimulatorManager()

		simulatorManager.state.on(
			StateEventType.Slices,
			(newSlices) => {
				slices = newSlices
			},
			"simulator-slices",
		)
		simulatorManager.state.on(
			StateEventType.Message,
			(newMessage) => {
				message = newMessage
			},
			"simulator-message",
		)

		simulatorManager.init()
	}
</script>

<div
	class="{simulatorClass} {className}"
	style="z-index: {zIndex}; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; overflow: auto; background: {background}"
>
	{#if message}
		<article>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html message}
		</article>
	{:else if slices.length}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			id="root"
			class={simulatorRootClass}
			onclick={onClickHandler}
			onsubmit={disableEventHandler}
			onkeypress={disableEventHandler}
		>
			<!-- TODO: Use a snippet in the next major; it would break `let:slices`. -->
			<!-- svelte-ignore slot_element_deprecated -->
			<slot {slices} />
		</div>
	{/if}
</div>
