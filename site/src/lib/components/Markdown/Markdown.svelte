<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Blockquote from './Blockquote.svelte';
	import Code from './Code.svelte';
	import Codespan from './Codespan.svelte';
	import Heading from './Heading.svelte';
	import Link from './Link.svelte';
	export let source: string;
</script>

<SvelteMarkdown
	{source}
	renderers={{
		heading: Heading,
		code: Code,
		codespan: Codespan,
		link: Link,
		blockquote: Blockquote
	}}
/>
