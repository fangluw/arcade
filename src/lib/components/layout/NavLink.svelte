<script>
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { href, label } = $props();

	const isCurrent = $derived(page.route.id === href);
</script>

<li>
	<a href={resolve(href)} aria-current={isCurrent ? 'page' : undefined}>{label}</a>
</li>

<style>
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: var(--tap);
		min-width: var(--tap);
		padding: 0 var(--space-xs);
		color: var(--text);
		font-weight: 600;
		text-decoration: none;
		border: 2px solid transparent;
		transition: background-color 0.5s ease;
	}

	a:hover {
		background: var(--clue);
		color: var(--on-color);
	}

	a[aria-current='page'] {
		background: var(--highlight);
		color: var(--on-color);
		border-color: var(--line);
	}

	@media (max-width: 600px) {
		li {
			flex: 1 1 auto;
		}

		a {
			min-height: var(--nav-height);
			padding: 0 var(--space-3xs);
			font-size: var(--step--1);
			text-align: center;
		}
	}
</style>
