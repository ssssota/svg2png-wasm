<script lang="ts">
	import { CodeSnippet } from 'carbon-components-svelte';
	export let raw: string;
</script>

<CodeSnippet
	type="inline"
	code={raw.replace(/^\s*`/, '').replace(/`\s*$/, '')}
/>
