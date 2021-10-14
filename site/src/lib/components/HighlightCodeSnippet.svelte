<script lang="ts">
	import { Grammar, highlight } from 'prismjs';
	import { CodeSnippet } from 'carbon-components-svelte';
	export let code: string;
	export let grammar: Grammar;
	export let language: string;
</script>

<CodeSnippet {code} {...$$restProps}>
	{@html highlight(code, grammar, language)}
</CodeSnippet>
