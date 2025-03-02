import type { Plugin } from "svelte-exmarkdown";
import Blockquote from "./BlockquoteAdapter.svelte";
import Code from "./CodeAdapter.svelte";
import Pre from "./PreAdapter.svelte";

export const codePlugin: Plugin = {
	renderer: {
		pre: Pre,
		code: Code,
		blockquote: Blockquote,
		h1: "h2",
		h2: "h3",
		h3: "h4",
		h4: "h5",
		h5: "h6",
	},
};
