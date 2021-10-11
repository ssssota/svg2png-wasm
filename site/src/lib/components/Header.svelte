<script lang="ts">
	import { base } from '$app/paths';
	import { LogoGithub32 } from 'carbon-icons-svelte';
</script>

<header>
	<div>
		<h1>
			<img width="48" src="{base}/icon.svg" alt="svg2png-wasm icon" />
		</h1>
		<div class="spacer" />
		<p>
			<a
				href="https://github.com/ssssota/svg2png-wasm"
				target="_blank"
				rel="noopener noreferer"
			>
				<LogoGithub32 style="fill:#000" />
			</a>
		</p>
	</div>
</header>

<style>
	header {
		width: 100%;
	}
	header div {
		max-width: 960px;
		margin: 0 auto;
		padding: 0 1em;

		display: flex;
		align-items: center;
	}

	.spacer {
		flex-grow: 1;
	}

	h1,
	p {
		margin: 0;
		font-size: 1em;
	}
</style>
