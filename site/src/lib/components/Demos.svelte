<script lang="ts">
import { base } from "$app/paths";
import { browser } from "$app/environment";
import { svg2png } from "$lib/stores";
import { Button, SkeletonPlaceholder } from "carbon-components-svelte";
import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";

const imagesPromiseMap: Record<string, Promise<Uint8Array>[]> = {
	[`${base}/icon.svg`]: [],
	[`${base}/gradient.svg`]: [],
	[`${base}/parrot.svg`]: [],
};
</script>

<div class="demos">
  {#each Object.entries(imagesPromiseMap) as [url, promises] (url)}
    <div>
      <p class="input"><img src={url} alt="{url} svg" /></p>
      <p>
        <Button
          icon={ArrowRight}
          on:click={() => {
            const svgPromise = fetch(url).then((res) => res.text());
            imagesPromiseMap[url] = [
              svgPromise.then(
                (svg) => $svg2png(svg, { scale: 1 }) ?? Promise.reject('error'),
              ),
              svgPromise.then(
                (svg) => $svg2png(svg, { scale: 2 }) ?? Promise.reject('error'),
              ),
              svgPromise.then(
                (svg) => $svg2png(svg, { scale: 3 }) ?? Promise.reject('error'),
              ),
            ];
          }}
        >
          CONVERT
        </Button>
      </p>
      <p class="result">
        {#each promises as promise}
          {#await promise}
            <SkeletonPlaceholder style="height:24px" />
          {:then buf}
            {#if browser}
              <img
                src={URL.createObjectURL(
                  new Blob([buf], { type: 'image/png' }),
                )}
                alt="converted"
              />
            {/if}
          {/await}
        {/each}
      </p>
    </div>
  {/each}
</div>

<style>
  .demos {
    display: flex;
    flex-wrap: wrap;
  }
  .demos div {
    padding: 1em;
  }
  .result {
    max-width: 100%;
    overflow-x: auto;
  }
</style>
