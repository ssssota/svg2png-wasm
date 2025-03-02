<script lang="ts">
import Children from "svelte-exmarkdown/renderer/Children.svelte";
import type { HastNode } from "svelte-exmarkdown/types";
import Code from "./Code.svelte";
export let tagName: string;
export let children: HastNode[] | undefined;
export let properties: Record<string, unknown>;

export const type: unknown = undefined;
export const position: unknown = undefined;
export const __index: unknown = undefined;
// HACK: ignore `unused-export-let`
tagName && type && position && __index;
</script>

{#if Array.isArray(children) && children.length !== 0}
  <!-- prettier-ignore -->
  <Code {...properties}><Children {children} /></Code>
{:else}
  <!-- prettier-ignore -->
  <Code {...properties} />
{/if}
