import { afterEach, beforeEach } from "vitest";

import { MockFactory, createMockFactory } from "@prismicio/mock";
import { cleanup } from "@testing-library/svelte";

declare module "vitest" {
	export interface TestContext {
		mock: MockFactory;
	}
}

beforeEach((ctx) => {
	ctx.mock = createMockFactory({ seed: ctx.task.name });
});

afterEach(() => {
	cleanup();
});
