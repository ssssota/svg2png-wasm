<script lang="ts">
import Markdown from "./Markdown.svelte";
export let code: string;
export const language = "";
let md = "";
$: md = `\`\`\`${language}\n${code}\n\`\`\``;
</script>

<Markdown {md} />
