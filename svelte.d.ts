import type { ComponentType, SvelteComponent } from "svelte";

// Because we target Svelte 4 as our minimum supported version, we need to mock the new
// Svelte 5 `Component` type for type compatibility in this codebase only.
// In userland, since Svelte is installed as a peer dependency, the correct type will be used.
declare module "svelte" {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type Component<Props extends Record<string, any> = any> = ComponentType<
		SvelteComponent<Props>
	>;
}
