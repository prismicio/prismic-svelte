import { hasContext, getContext } from "svelte";

import { prismicKey } from "./injectionSymbols";
import { PrismicContext } from "./types";

export const usePrismic = (): PrismicContext => {
	if (hasContext(prismicKey)) {
		return getContext<PrismicContext>(prismicKey);
	} else {
		return {};
	}
};
