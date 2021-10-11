<script lang="ts">
	import {
		PackageManager,
		packageManager,
		packageManagers
	} from '$lib/stores/packageManager';
	import {
		CodeSnippet,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';

	const installCommands = {
		npm: 'npm install svg2png-wasm',
		yarn: 'yarn add svg2png-wasm',
		pnpm: 'pnpm add svg2png-wasm'
	};
</script>

<main>
	<section>
		<h3 class="main-title">svg2png-wasm</h3>
		<p>Convert svg to png using WebAssembly.</p>
		<div>
			<RadioButtonGroup bind:selected={$packageManager}>
				{#each packageManagers as pm (pm)}
					<RadioButton labelText={pm} value={pm} />
				{/each}
			</RadioButtonGroup>
			<CodeSnippet code={installCommands[$packageManager]} />
		</div>
	</section>
</main>

<style>
	main section {
		max-width: 960px;
		margin: 0 auto;
		padding: 0 1.5em;
	}
	main section div {
		padding: 1em 0;
	}

	.main-title {
		font-size: 3rem;
		margin-top: 2em;
		margin-bottom: 0;
	}
</style>
