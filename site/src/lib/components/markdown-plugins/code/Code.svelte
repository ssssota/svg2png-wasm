<script lang="ts">
import { CodeSnippet } from "carbon-components-svelte";
</script>

<CodeSnippet {...$$props} type="inline">
  <slot />
</CodeSnippet>
