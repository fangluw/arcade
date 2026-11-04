<script>
	import { resolve } from '$app/paths';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Section from '$lib/components/content/Section.svelte';
	import InfoCard from '$lib/components/content/InfoCard.svelte';
	import { games } from '$lib/data/site.js';
</script>

<PageMeta description="Carmen's website for CS5610." />

<h1>Welcome to Carmen's Website</h1>
<p>This is my personal website for CS5610.</p>

<Section heading="Games">
	{#each games as game (game.id)}
		<InfoCard title={game.title}>
			<p><a href={resolve(game.href)}>{game.linkText}</a></p>
		</InfoCard>
	{/each}
</Section>
