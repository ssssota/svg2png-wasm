<script lang="ts">
	import Prism from 'prismjs';
	import { CodeSnippet } from 'carbon-components-svelte';
	export let code: string;
	export let grammar: Prism.Grammar | undefined = undefined;
	export let language: string | undefined = undefined;
</script>

{#if grammar && language}
	<CodeSnippet {code} {...$$restProps}>
		{@html Prism.highlight(code, grammar, language)}
	</CodeSnippet>
{:else}
	<CodeSnippet {code} {...$$restProps} />
{/if}
