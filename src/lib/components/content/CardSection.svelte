<script>
	import Section from './Section.svelte';
	import InfoCard from './InfoCard.svelte';

	let { heading, items } = $props();
</script>

<Section {heading}>
	{#each items as item (item.title)}
		<InfoCard title={item.title} subtitle={item.subtitle}>
			<p>{item.body}</p>
		</InfoCard>
	{/each}
</Section>
