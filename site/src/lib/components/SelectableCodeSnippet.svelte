<script lang="ts">
	import {
		CodeSnippet,
		RadioButton,
		RadioButtonGroup
	} from 'carbon-components-svelte';

	export let titleValueMap: Record<string, string>;
	export let selectedTitle: string = Object.keys(titleValueMap)[0];
</script>

<div>
	<RadioButtonGroup bind:selected={selectedTitle}>
		{#each Object.keys(titleValueMap) as title (title)}
			<RadioButton labelText={title} value={title} />
		{/each}
	</RadioButtonGroup>
	<CodeSnippet code={titleValueMap[selectedTitle]} />
</div>

<style>
	div {
		padding: 1em 0;
	}
</style>
