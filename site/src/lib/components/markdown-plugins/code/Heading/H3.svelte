<script lang="ts">
import type { HastNode } from "svelte-exmarkdown/types";
import Children from "svelte-exmarkdown/renderer/Children.svelte";
export let tagName: string;
export let children: HastNode[] | undefined;
export let properties: Record<string, unknown>;

export let type: unknown = undefined;
export let position: unknown = undefined;
export let __index: unknown = undefined;
// HACK: ignore `unused-export-let`
tagName && type && position && __index;
</script>

{#if Array.isArray(children) && children.length !== 0}
  <!-- prettier-ignore -->
  <h4 {...properties}><Children {children} /></h4>
{:else}
  <!-- prettier-ignore -->
  <!-- svelte-ignore a11y-missing-content -->
  <h4 {...properties} />
{/if}
