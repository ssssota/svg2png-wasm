<script lang="ts">
	import { base } from '$app/paths';
	import Header from '$lib/components/Header.svelte';
	import 'carbon-components-svelte/css/white.css';
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.png" />

	<!-- for prerendering -->
	<link rel="prefetch" href="{base}/svg2png.wasm" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@1,300&family=IBM+Plex+Sans:wght@300;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header />

<slot />

<style>
	:root {
		font-family: 'IBM Plex Sans', 'Segoe UI', Tahoma, Geneva, Verdana,
			sans-serif;
	}
	:global(pre),
	:global(code) {
		font-family: 'IBM Plex Mono', Menlo, Consolas, 'Courier New', Courier,
			monospace;
	}
</style>
