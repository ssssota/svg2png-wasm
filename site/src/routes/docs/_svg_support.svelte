<script lang="ts" context="module">
	export const name = 'svg-support';
	export const title = 'SVG Support';
</script>

<script lang="ts">
	import { OutboundLink } from 'carbon-components-svelte';
</script>

<p>
	svg2png-wasm uses resvg
	<OutboundLink href="https://crates.io/crates/resvg">resvg</OutboundLink>
	for SVG conversion.
</p>
<p>
	So, please check
	<OutboundLink href="https://crates.io/crates/resvg#svg-support">
		resvg document
	</OutboundLink>
	for SVG support status.
</p>

<style>
	p {
		padding-top: 0.5em;
	}
</style>
