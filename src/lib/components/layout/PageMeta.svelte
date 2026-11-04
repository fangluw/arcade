<script>
	import { site } from '$lib/data/site.js';

	let { title = '', description } = $props();

	const fullTitle = $derived(title ? `${title} | ${site.title}` : site.homeTitle);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
</svelte:head>
