<script lang="ts">
  import {
    CodeSnippet,
    RadioButton,
    RadioButtonGroup,
  } from "carbon-components-svelte";
  import HighlightCodeSnippet from "./HighlightCodeSnippet.svelte";

  type Props = {
    highlight?: { language: string };
    titleValueMap: Record<string, string>;
    selectedTitle: string;
  };
  let { highlight, titleValueMap, selectedTitle }: Props = $props();
</script>

<div>
  <RadioButtonGroup bind:selected={selectedTitle}>
    {#each Object.keys(titleValueMap) as title (title)}
      <RadioButton labelText={title} value={title} />
    {/each}
  </RadioButtonGroup>

  {#if highlight !== undefined}
    <HighlightCodeSnippet
      code={titleValueMap[selectedTitle]}
      language={highlight?.language}
    />
  {:else}
    <CodeSnippet code={titleValueMap[selectedTitle]} />
  {/if}
</div>

<style>
  div {
    padding: 1em 0;
  }
</style>
