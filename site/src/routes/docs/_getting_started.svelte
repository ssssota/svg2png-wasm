<script lang="ts" context="module">
	export const name = 'getting-started';
	export const title = 'Getting Started';
</script>

<script lang="ts">
	import InstallCommand from '$lib/components/InstallCommand.svelte';
	import SelectableCodeSnippet from '$lib/components/SelectableCodeSnippet.svelte';
	import { CodeSnippet } from 'carbon-components-svelte';

	const denoImports = {
		skypack: `export * from 'https://cdn.skypack.dev/svg2png-wasm?dts';`,
		'esm.sh': `export * from 'https://esm.sh/svg2png-wasm';`
	} as const;
</script>

<p>
	You can use this library in
	<CodeSnippet type="inline">Node.js</CodeSnippet>,
	<CodeSnippet type="inline">Deno</CodeSnippet> and
	<CodeSnippet type="inline">Browser</CodeSnippet>.
</p>

<h4>Node.js</h4>
<InstallCommand />

<h4>Deno</h4>
<SelectableCodeSnippet titleValueMap={denoImports} />

<h4>Browser</h4>
<p>
	You can use npm (like Node.js) to bundle it with bundler (Webpack, Vite,
	etc.).<br />
	It can also be used directly as follows.
</p>
<CodeSnippet
	code={`<scrpt src="https://unpkg.com/svg2png-wasm"></scrpt>`.replace(
		/scrpt/g,
		'script'
	)}
/><br />
<CodeSnippet
	code={`const { initialize, svg2png, createSvg2png } = svg2pngWasm;`}
/>

<style>
	h4,
	p {
		padding-top: 0.5em;
	}
</style>
