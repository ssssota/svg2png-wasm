<script lang="ts" context="module">
	export const name = 'font-settings';
	export const title = 'Font settings';
</script>

<script lang="ts">
	import Prism from 'prismjs';
	import HighlightCodeSnippet from '$lib/components/HighlightCodeSnippet.svelte';
	import { InlineNotification } from 'carbon-components-svelte';

	const fontSampleCode = `
const robotoFont = await fetch('/assets/Roboto.ttf').then(res => res.arrayBuffer());
const png = svg2png(svgData, {
  fonts: [new Uint8Array(robotoFont)],
  defaultFontFamily: {
    sansSerifFamily: 'Roboto'
  }
});`.trim();
</script>

<InlineNotification
	hideCloseButton
	kind="warning"
	subtitle="If you want to use text in SVG, you need to check this section."
/>
<InlineNotification
	hideCloseButton
	kind="warning"
	subtitle="We are aware that this API is not easy to understand and we will improve it, so please pay attention to future API changes."
/>

<p>
	WebAssembly is run in a sandbox for safety reasons. Therefore, WebAssembly
	does not have access to system information, for example, it cannot use the
	system fonts.
</p>
<p>
	For this reason, svg2png-wasm passes the font externally when you want to use
	text in SVG.
</p>

<h4>Example</h4>
<HighlightCodeSnippet
	type="multi"
	code={fontSampleCode}
	grammar={Prism.languages.js}
	language="javascript"
/>

<style>
	h4,
	p {
		padding-top: 0.5em;
	}
</style>
