<script lang="ts">
	import { base } from '$app/paths';
	import { LogoGithub32 } from 'carbon-icons-svelte';
	import { Link } from 'carbon-components-svelte';
</script>

<header>
	<div>
		<h1>
			<a href="{base}/">
				<img width="48" src="{base}/icon.svg" alt="svg2png-wasm icon" />
			</a>
		</h1>
		<div class="spacer" />
		<nav>
			<Link href="{base}/docs" size="lg">Docs</Link>
		</nav>
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

	nav {
		padding: 2em;
	}

	h1,
	p {
		margin: 0;
		font-size: 1em;
	}
</style>
