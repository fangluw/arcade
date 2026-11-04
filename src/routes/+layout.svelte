<script>
	import '../app.css';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	let { children } = $props();
</script>

<SiteHeader />

<main>
	{@render children()}
</main>

<SiteFooter />

<style>
	main {
		flex: 1;
		width: 100%;
		max-width: 44rem;
		margin: 0 auto;
		padding: var(--space-xl) var(--space-l);
	}

	@media (max-width: 600px) {
		main {
			padding: var(--space-l) var(--space-s);
		}
	}
</style>
