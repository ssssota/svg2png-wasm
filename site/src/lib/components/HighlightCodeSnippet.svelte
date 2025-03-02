<script lang="ts">
  import Markdown from "./Markdown.svelte";
  let { code, language = "" }: { code: string; language: string } = $props();
</script>

<Markdown md={`\`\`\`${language}\n${code}\n\`\`\``} />
