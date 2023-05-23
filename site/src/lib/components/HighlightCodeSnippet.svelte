<script lang="ts">
  import Markdown from './Markdown.svelte';
  export let code: string;
  export let language = '';
  let md = '';
  $: md = `\`\`\`${language}\n${code}\n\`\`\``;
</script>

<Markdown {md} />
