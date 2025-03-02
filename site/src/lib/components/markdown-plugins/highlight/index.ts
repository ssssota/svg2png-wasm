import typescript from "highlight.js/lib/languages/typescript";
import rehypeHighlight from "rehype-highlight";
import type { Plugin } from "svelte-exmarkdown";
import "highlight.js/styles/github.css";

export const highlightPlugin: Plugin = {
	rehypePlugin: [rehypeHighlight, { languages: { typescript } }],
};
