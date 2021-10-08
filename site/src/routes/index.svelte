<script lang="ts">
	import { svg2png } from '$lib/svg2png';
	import { browser } from '$app/env';
	let svg: string = '';
	let convertPromise: Promise<Uint8Array> | undefined;
</script>

<textarea bind:value={svg} cols="30" rows="10" />

<button
	on:click={async () => {
		if (svg.length === 0) return;
		convertPromise = svg2png(svg);
	}}>convert</button
>

{#if browser && convertPromise !== undefined}
	{#await convertPromise}
		<p>converting...</p>
	{:then result}
		<!-- svelte-ignore missing-declaration -->
		<p>
			<img
				src={URL.createObjectURL(new Blob([result], { type: 'image/png' }))}
				alt="converted"
			/>
		</p>
	{:catch err}
		<p>{err}</p>
	{/await}
{/if}
