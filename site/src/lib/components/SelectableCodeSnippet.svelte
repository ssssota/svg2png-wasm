<script lang="ts">
import {
	CodeSnippet,
	RadioButton,
	RadioButtonGroup,
} from "carbon-components-svelte";
import HighlightCodeSnippet from "./HighlightCodeSnippet.svelte";

export const highlight: { language: string } | undefined = undefined;
export let titleValueMap: Record<string, string>;
export const selectedTitle: string = Object.keys(titleValueMap)[0];
</script>

<div>
  <RadioButtonGroup bind:selected={selectedTitle}>
    {#each Object.keys(titleValueMap) as title (title)}
      <RadioButton labelText={title} value={title} />
    {/each}
  </RadioButtonGroup>

  {#if highlight !== undefined}
    <HighlightCodeSnippet code={titleValueMap[selectedTitle]} {...highlight} />
  {:else}
    <CodeSnippet code={titleValueMap[selectedTitle]} />
  {/if}
</div>

<style>
  div {
    padding: 1em 0;
  }
</style>
