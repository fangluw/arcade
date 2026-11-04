<script>
	import NavLink from './NavLink.svelte';
	import { navItems } from '$lib/data/site.js';
</script>

<nav aria-label="Main">
	<ul>
		{#each navItems as item (item.href)}
			<NavLink href={item.href} label={item.label} />
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (max-width: 600px) {
		nav {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			padding-bottom: env(safe-area-inset-bottom, 0px);
			background: var(--surface);
			border-top: var(--border);
		}

		ul {
			flex-wrap: nowrap;
			gap: 0;
		}
	}
</style>
