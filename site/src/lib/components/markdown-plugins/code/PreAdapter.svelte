<script>
  import { getAstNode, Renderer } from "svelte-exmarkdown";
  import { get } from "svelte/store";
  import Pre from "./Pre.svelte";
  let { children, ...properties } = $props();
</script>

<Pre {...properties}
  >{#each get(getAstNode()).children?.[0].children ?? [] as astNode}<Renderer
      {astNode}
    />{/each}</Pre
>
