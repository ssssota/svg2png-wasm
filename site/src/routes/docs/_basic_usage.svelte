<script lang="ts" context="module">
	export const name = 'basic-usage';
	export const title = 'Basic usage';
</script>

<script lang="ts">
	import { CodeSnippet } from 'carbon-components-svelte';

	const prepareWasm = {
		node: `
// Node.js
import { readFileSync } from 'fs';
const wasm = readFileSync('./node_modules/svg2png-wasm/svg2png_wasm_bg.wasm');`.trim(),
		deno: `
// Deno (For example, fetch from unpkg CDN)
const wasm = await fetch('https://unpkg.com/svg2png-wasm/svg2png_wasm_bg.wasm')
  .then(res => res.arrayBuffer())`.trim(),
		browser: `
// browser (For example, let's say that we have a wasm file in the assets directory)
const wasm = await fetch('/assets/svg2png_wasm_bg.wasm').then(res => res.arrayBuffer())`.trim()
	};

	const initializeCode = `
import { initialize } from 'svg2png-wasm';
await initialize(wasm);`.trim();

	const convertCode = `
import { svg2png } from 'svg2png-wasm';
const png = await svg2png(svg)`.trim();
</script>

<h4>1. Prepare wasm</h4>
<p>You will need to prepare a wasm module.</p>

<p>e.g.</p>
{#each Object.entries(prepareWasm) as [env, code] (env)}
	<div class="code-snippet">
		<CodeSnippet type="multi" {code} />
	</div>
{/each}

<h4>2. Initialize wasm</h4>
<CodeSnippet type="multi" code={initializeCode} />

<h4>3. Convert SVG</h4>
<CodeSnippet type="multi" code={convertCode} />

<style>
	h4,
	p,
	.code-snippet {
		padding-top: 0.5em;
	}
</style>
