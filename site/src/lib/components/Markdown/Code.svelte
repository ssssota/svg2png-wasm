<script lang="ts">
	import HighlightCodeSnippet from '../HighlightCodeSnippet.svelte';
	import Prism from 'prismjs';

	export let lang: string | undefined = undefined;
	export let text: string;
</script>

<div>
	<HighlightCodeSnippet
		type={text.includes('\n') ? 'multi' : 'single'}
		code={text}
		language={lang}
		grammar={lang ? Prism.languages[lang] : undefined}
	/>
</div>

<style>
	div {
		padding-bottom: 0.5em;
	}
</style>
