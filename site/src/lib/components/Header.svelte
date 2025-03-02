<script lang="ts">
import { base } from "$app/paths";
import LogoGithub from "carbon-icons-svelte/lib/LogoGithub.svelte";
import { Link } from "carbon-components-svelte";
import type { ComponentType, SvelteComponentTyped } from "svelte";
// HACK: type error
const LogoGithubTyped = LogoGithub as ComponentType<
	SvelteComponentTyped<
		(typeof LogoGithub)["prototype"]["props"],
		(typeof LogoGithub)["prototype"]["events"],
		(typeof LogoGithub)["prototype"]["slots"]
	>
>;
</script>

<header>
  <div>
    <h1>
      <a href="{base}/">
        <img width="48" src="{base}/icon.svg" alt="svg2png-wasm" />
      </a>
    </h1>
    <div class="spacer" />
    <nav>
      <Link href="{base}/docs" size="lg">Docs</Link>
    </nav>
    <p>
      <Link
        href="https://github.com/ssssota/svg2png-wasm"
        target="_blank"
        rel="noopener noreferer"
      >
        <LogoGithubTyped fill="black" size={32} />
      </Link>
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
