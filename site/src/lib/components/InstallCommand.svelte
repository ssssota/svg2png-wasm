<script lang="ts">
  import { packageManager } from '$lib/stores';
  import SelectableCodeSnippet from './SelectableCodeSnippet.svelte';
  const installCommands = {
    npm: 'npm install svg2png-wasm',
    yarn: 'yarn add svg2png-wasm',
    pnpm: 'pnpm add svg2png-wasm',
  };
</script>

<SelectableCodeSnippet
  titleValueMap={installCommands}
  bind:selectedTitle={$packageManager}
/>
