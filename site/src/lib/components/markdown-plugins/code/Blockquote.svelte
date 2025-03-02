<script lang="ts">
import { InlineNotification } from "carbon-components-svelte";
</script>

<blockquote>
  <InlineNotification
    {...$$props}
    kind="warning-alt"
    hideCloseButton
    lowContrast
  >
    <slot slot="subtitle" />
  </InlineNotification>
</blockquote>
