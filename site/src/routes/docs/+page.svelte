<script lang="ts">
  import Markdown from '$lib/components/Markdown.svelte';
  import { Link, ListItem, UnorderedList } from 'carbon-components-svelte';
  import { page } from '$app/stores';

  export let data: {
    sections: { meta: { title: string }; body: string; slug: string }[];
  };
</script>

<main>
  <nav class="toc">
    <UnorderedList>
      {#each data.sections as { meta, slug } (slug)}
        <ListItem>
          <Link href="#{slug}">{meta.title}</Link>
        </ListItem>
      {/each}
    </UnorderedList>
  </nav>
  {#each data.sections as { body, meta, slug } (slug)}
    <section>
      <h2 id={slug} class="title">
        {meta.title}
        <a aria-hidden href="{$page.url}#{slug}" class="header-anchor"> # </a>
      </h2>
      <Markdown md={body} />
    </section>
  {/each}
</main>

<style>
  main section {
    max-width: 960px;
    margin: 2em auto;
    padding: 0 1.5em;
  }

  nav {
    max-width: 960px;
    margin: 2em auto;
    padding: 0 1.5em;
    padding-left: 3em;
  }

  .title .header-anchor {
    opacity: 0;
    text-decoration: none;
    transition: opacity 0.1s ease;
    color: #666;
  }
  .title:hover .header-anchor {
    opacity: 1;
  }
</style>
