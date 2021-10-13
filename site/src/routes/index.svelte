<script lang="ts">
	import Demos from '$lib/components/Demos.svelte';
	import Playground from '$lib/components/Playground.svelte';
	import InstallCommands from '$lib/components/InstallCommand.svelte';
</script>

<main>
	<section>
		<h1 class="main-title">svg2png-wasm</h1>
		<p>Convert svg to png using WebAssembly.</p>
		<InstallCommands />
	</section>

	<section>
		<h2>Demo</h2>
		<Demos />
	</section>

	<section>
		<h2>Playground</h2>
		<p>Runs in the browser, file is not sent to the server.</p>
		<Playground />
	</section>
</main>

<style>
	main section {
		max-width: 960px;
		margin: 2em auto;
		padding: 0 1.5em;
	}
	.main-title {
		font-size: 3rem;
		margin-top: 2em;
		margin-bottom: 0;
	}
</style>
