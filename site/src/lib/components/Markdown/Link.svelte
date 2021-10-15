<script lang="ts">
	import { Link, OutboundLink } from 'carbon-components-svelte';
	export let href = '';
	export let title: string | undefined = undefined;
</script>

{#if href.startsWith('http')}
	<OutboundLink inline {href} {title}><slot /></OutboundLink>
{:else}
	<Link inline {href} {title}><slot /></Link>
{/if}
