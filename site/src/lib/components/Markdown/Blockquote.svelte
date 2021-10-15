<script lang="ts">
	import { InlineNotification } from 'carbon-components-svelte';
</script>

<blockquote>
	<InlineNotification lowContrast kind="warning-alt" hideCloseButton>
		<slot />
	</InlineNotification>
</blockquote>
