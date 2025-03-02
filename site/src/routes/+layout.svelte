<script lang="ts">
  import { base } from "$app/paths";
  import Header from "$lib/components/Header.svelte";
  import "carbon-components-svelte/css/white.css";
  import "../app.css";
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<svelte:head>
  <title>svg2png-wasm</title>

  <meta
    name="description"
    content="svg2png-wasm is JS/WASM library. You can convert svg in the any environment."
  />
  <meta name="keywords" content="svg,png,wasm,convert,js,javascript" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="svg2png-wasm" />
  <meta
    property="og:description"
    content="svg2png-wasm is JS/WASM library. You can convert svg in the any environment."
  />
  <meta property="og:image" content="https://ssssota.github.io{base}/ogp.png" />
  <meta property="og:url" content="http://ssssota.github.io{base}/" />

  <link rel="icon" href="{base}/favicon.png" />

  <!-- for prerendering -->
  <link rel="prefetch" href="{base}/svg2png.wasm" />
  <link rel="prefetch" href="{base}/ogp.png" />

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

{@render children?.()}

<footer></footer>

<style>
  :root {
    font-family: "IBM Plex Sans", "Segoe UI", Tahoma, Geneva, Verdana,
      sans-serif;
  }
  :global(pre),
  :global(code) {
    font-family: "IBM Plex Mono", Menlo, Consolas, "Courier New", Courier,
      monospace;
  }

  footer {
    height: 10vmin;
  }
</style>
