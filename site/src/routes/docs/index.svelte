<script lang="ts">
	import { page } from '$app/stores';
	import { Link, ListItem, UnorderedList } from 'carbon-components-svelte';
	import type { SvelteComponent } from 'svelte';
	import AdvancedUsage, * as AdvancedUsageInfo from './_advanced_usage.svelte';
	import BasicUsage, * as BasicUsageInfo from './_basic_usage.svelte';
	import FontSettings, * as FontSettingsInfo from './_font_settings.svelte';
	import GettingStarted, * as GettingStartedInfo from './_getting_started.svelte';
	import SvgSupport, * as SvgSupportInfo from './_svg_support.svelte';
	import 'prismjs/themes/prism-tomorrow.css';

	type SectionEntry = [typeof SvelteComponent, { name: string; title: string }];
	const sections: SectionEntry[] = [
		[SvgSupport, SvgSupportInfo],
		[GettingStarted, GettingStartedInfo],
		[BasicUsage, BasicUsageInfo],
		[FontSettings, FontSettingsInfo],
		[AdvancedUsage, AdvancedUsageInfo]
	];
</script>

<main>
	<section class="toc">
		<UnorderedList>
			{#each sections as [, info] (info.name)}
				<ListItem>
					<Link href="#{info.name}">{info.title}</Link>
				</ListItem>
			{/each}
		</UnorderedList>
	</section>
	{#each sections as [Section, info] (info.name)}
		<section>
			<h2 id={info.name} class="title">
				{info.title}
				<a aria-hidden href="{$page.path}#{info.name}" class="header-anchor">
					#
				</a>
			</h2>
			<svelte:component this={Section} />
		</section>
	{/each}
</main>

<style>
	main section {
		max-width: 960px;
		margin: 2em auto;
		padding: 0 1.5em;
	}

	.toc {
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
