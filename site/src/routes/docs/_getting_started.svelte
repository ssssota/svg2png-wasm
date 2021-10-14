<script lang="ts" context="module">
	export const name = 'getting-started';
	export const title = 'Getting Started';
</script>

<script lang="ts">
	import { languages } from 'prismjs';
	import InstallCommand from '$lib/components/InstallCommand.svelte';
	import SelectableCodeSnippet from '$lib/components/SelectableCodeSnippet.svelte';
	import HighlightCodeSnippet from '$lib/components/HighlightCodeSnippet.svelte';

	const denoImports = {
		skypack: `export * from 'https://cdn.skypack.dev/svg2png-wasm?dts';`,
		'esm.sh': `export * from 'https://esm.sh/svg2png-wasm';`
	} as const;
</script>

<p>
	You can use this library in
	Node.js,
	Deno and
	Browser.
</p>

<h4>Node.js</h4>
<InstallCommand />

<h4>Deno</h4>
<SelectableCodeSnippet
	highlight={{ grammar: languages.js, language: 'javascript' }}
	titleValueMap={denoImports}
/>

<h4>Browser</h4>
<p>
	You can use npm (like Node.js) to bundle it with bundler (Webpack, Vite,
	etc.).<br />
	It can also be used directly as follows.
</p>
<HighlightCodeSnippet
	code={`<scrpt src="https://unpkg.com/svg2png-wasm"></scrpt>`.replace(
		/scrpt/g,
		'script'
	)}
	grammar={languages.html}
	language="html"
/>
<br />
<HighlightCodeSnippet
	code={`const { initialize, svg2png, createSvg2png } = svg2pngWasm;`}
	grammar={languages.js}
	language="javascript"
/>

<style>
	h4,
	p {
		padding-top: 0.5em;
	}
</style>
