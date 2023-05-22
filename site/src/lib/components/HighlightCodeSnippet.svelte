<script lang="ts">
  import hljs from 'highlight.js';
  import { CodeSnippet } from 'carbon-components-svelte';
  export let code: string;
  export let grammar: Prism.Grammar | undefined = undefined;
  export let language: string | undefined = undefined;
</script>

{#if grammar && language}
  <CodeSnippet {code} {...$$restProps}>
    {@html hljs.highlight(language, code).value}
  </CodeSnippet>
{:else}
  <CodeSnippet {code} {...$$restProps} />
{/if}
