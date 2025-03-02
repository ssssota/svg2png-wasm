<script>
  import Code from "./Code.svelte";
  let { children, ...properties } = $props();
</script>

<Code {...properties}>{@render children?.()}</Code>
