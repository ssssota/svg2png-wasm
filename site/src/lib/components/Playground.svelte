<script lang="ts">
  import {
    FileUploaderItem,
    FileUploaderDropContainer,
    SkeletonPlaceholder,
  } from 'carbon-components-svelte';
  import { svg2png } from '$lib/stores';
  import { browser } from '$app/environment';

  let inputElement: HTMLInputElement;

  type FileInfo = {
    id: string;
    name: string;
    value: Promise<string>;
  };

  let fileInfoList: FileInfo[] = [];
  const fileSelected = ({ detail }: CustomEvent<readonly File[]>) => {
    fileInfoList = [
      ...Array.from(detail)
        .filter((f) => f.type === 'image/svg+xml')
        .map((f) => ({
          id: `file-${Math.random().toString(36)}`,
          name: f.name,
          value: f.text(),
        })),
      ...fileInfoList,
    ];
  };
</script>

<div>
  <FileUploaderDropContainer
    multiple
    labelText="Drag and drop file here or click to upload svg"
    accept={['.svg']}
    bind:ref={inputElement}
    on:add={fileSelected}
  />
  {#each fileInfoList as { id, name, value } (id)}
    {#await value}
      <FileUploaderItem {name} status="uploading" />
    {:then text}
      <FileUploaderItem {name} status="complete" />
      {#await $svg2png(text)}
        <SkeletonPlaceholder />
      {:then buf}
        {#if browser}
          <img
            src={URL.createObjectURL(
              new window.Blob([buf], { type: 'image/png' }),
            )}
            alt={name}
          />
        {/if}
      {/await}
    {:catch e}
      <FileUploaderItem {name} status="edit" errorBody={e} />
    {/await}
  {/each}
</div>

<style>
  img {
    max-width: 100%;
    overflow-x: auto;
  }
</style>
