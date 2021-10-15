<script lang="ts">
	export let depth: 1 | 2 | 3 | 4 | 5 | 6 | undefined = undefined;
	export let raw: string;
</script>

{#if depth === 1}
	<h2><slot /></h2>
{:else if depth === 2}
	<h3><slot /></h3>
{:else if depth === 3}
	<h4><slot /></h4>
{:else if depth === 4}
	<h5><slot /></h5>
{:else if depth === 5}
	<h6><slot /></h6>
{:else if depth === 6}
	<h6><slot /></h6>
{:else}
	{raw}
{/if}

<style>
	h2,
	h3,
	h4,
	h5,
	h6 {
		padding-top: 0.5em;
	}
</style>
