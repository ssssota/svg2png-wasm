<script lang="ts">
	import Prism from 'prismjs';
	import { CodeSnippet } from 'carbon-components-svelte';
	export let code: string;
	export let grammar: Prism.Grammar;
	export let language: string;
</script>

<CodeSnippet {code} {...$$restProps}>
	{@html Prism.highlight(code, grammar, language)}
</CodeSnippet>
