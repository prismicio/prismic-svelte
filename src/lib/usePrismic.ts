import { hasContext, getContext } from "svelte";

import { prismicKey } from "./injectionSymbols";
import type { PrismicContext } from "../types/PrismicContext.type";

export const usePrismic = (): PrismicContext => {
	if (hasContext(prismicKey)) {
		return getContext<PrismicContext>(prismicKey);
	} else {
		return {};
	}
};
