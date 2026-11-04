<script>
	let { title, subtitle = '', children } = $props();
</script>

<article>
	<h3>{title}</h3>
	{#if subtitle}
		<h4>{subtitle}</h4>
	{/if}
	{@render children?.()}
</article>

<style>
	article {
		background: var(--surface);
		border: var(--border);
		padding: var(--space-s) var(--space-m);
	}

	h3 {
		margin-top: 0;
	}

	article > :global(:last-child) {
		margin-bottom: 0;
	}

	@media (max-width: 600px) {
		article {
			padding: var(--space-s);
		}
	}
</style>
