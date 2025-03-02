<script>
  import Blockquote from "./Blockquote.svelte";
  let { children, ...properties } = $props();
</script>

<Blockquote {...properties}>{@render children?.()}</Blockquote>
