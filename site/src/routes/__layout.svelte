<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.png" />

	<!-- for prerendering -->
	<link rel="prefetch" href="{base}/svg2png.wasm" />
</svelte:head>

<slot />
