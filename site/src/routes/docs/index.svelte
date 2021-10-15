<script context="module" lang="ts">
	import { browser } from '$app/env';
	import { base } from '$app/paths';
	import type { Load } from '@sveltejs/kit';
	import type { Section } from './[section].json';

	const sectionSlugs = [
		'svg-support',
		'getting-started',
		'basic-usage',
		'font-settings',
		'advanced-usage'
	];

	export const load: Load = async ({ fetch, page }) => {
		const sections = await Promise.all(
			sectionSlugs
				.map((slug) => `${browser ? base : ''}${page.path}/${slug}.json`)
				.map((url) => fetch(url).then((res) => res.json()))
		);
		return { props: { sections } };
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Markdown from '$lib/components/Markdown';
	import { Link, ListItem, UnorderedList } from 'carbon-components-svelte';
	import 'prismjs/themes/prism-tomorrow.css';

	export let sections: Section[];
</script>

<main>
	<nav class="toc">
		<UnorderedList>
			{#each sections as { metadata } (metadata.slug)}
				<ListItem>
					<Link href="#{metadata.slug}">{metadata.title}</Link>
				</ListItem>
			{/each}
		</UnorderedList>
	</nav>
	{#each sections as { body, metadata } (metadata.slug)}
		<section>
			<h2 id={metadata.slug} class="title">
				{metadata.title}
				<a
					aria-hidden
					href="{$page.path}#{metadata.slug}"
					class="header-anchor"
				>
					#
				</a>
			</h2>
			<Markdown source={body} />
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
