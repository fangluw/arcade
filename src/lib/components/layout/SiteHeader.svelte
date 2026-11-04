<script>
	import { resolve } from '$app/paths';
	import NavBar from './NavBar.svelte';
	import { site } from '$lib/data/site.js';
</script>

<header class="site-header">
	<a href={resolve('/')} class="site-title">{site.title}</a>
	<NavBar />
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-s);
		padding: var(--space-xs) var(--space-l);
		background: var(--surface);
		border-bottom: var(--border);
	}

	.site-title {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap);
		color: var(--text);
		font-family: 'Playfair Display', Georgia, serif;
		font-size: var(--step-2);
		font-weight: 800;
	}

	@media (max-width: 600px) {
		.site-header {
			padding: var(--space-3xs) var(--space-s);
		}

		.site-title {
			font-size: var(--step-1);
		}
	}
</style>
