<script>
	import { site } from '$lib/data/site.js';
</script>

<footer class="site-footer">
	<p>{site.updated}</p>
</footer>

<style>
	.site-footer {
		padding: var(--space-m) var(--space-l);
		background: var(--surface);
		border-top: var(--border);
		color: var(--muted);
		font-size: var(--step--1);
		text-align: center;
	}

	@media (max-width: 600px) {
		.site-footer {
			padding: var(--space-s);
		}
	}
</style>
