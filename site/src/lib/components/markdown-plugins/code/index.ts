import type { Plugin } from "svelte-exmarkdown";
import Blockquote from "./BlockquoteAdapter.svelte";
import Code from "./CodeAdapter.svelte";
import { H1, H2, H3, H4, H5 } from "./Heading";
import Pre from "./PreAdapter.svelte";

export const codePlugin: Plugin = {
	renderer: {
		pre: Pre,
		code: Code,
		blockquote: Blockquote,
		h1: H1,
		h2: H2,
		h3: H3,
		h4: H4,
		h5: H5,
	},
};
