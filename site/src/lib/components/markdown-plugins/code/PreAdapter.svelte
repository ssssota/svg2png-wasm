<script lang="ts">
  import Pre from './Pre.svelte';
  import type { HastNode } from 'svelte-exmarkdown/types';
  import Children from 'svelte-exmarkdown/renderer/Children.svelte';
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
  <!-- ignore `code` element -->
  {@const firstChild = children[0]}
  {@const childChildren =
    firstChild.type === 'element' ? firstChild.children : []}
  <!-- prettier-ignore -->
  <Pre {...properties}><Children children={childChildren} /></Pre>
{:else}
  <!-- prettier-ignore -->
  <Pre {...properties} />
{/if}
