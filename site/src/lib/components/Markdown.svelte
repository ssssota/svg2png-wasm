<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  import { codePlugin, highlightPlugin } from "./markdown-plugins";
  let { md }: { md: string } = $props();
  const plugins = [highlightPlugin, codePlugin];
</script>

<div class="container">
  <Markdown {md} {plugins} />
</div>

<style>
  .container {
    display: contents;
  }
  .container :global(:is(h1, h2, h3, h4, h5, h6)) {
    margin-top: 1em;
  }
  .container :global(:is(p)) {
    margin-top: 0.5em;
  }
  .container :global(blockquote p) {
    margin-top: 0;
  }
</style>
