<script>
	let { heading, children } = $props();
</script>

<section>
	<h2>{heading}</h2>
	<div class="stack">
		{@render children()}
	</div>
</section>

<style>
	section {
		margin-top: var(--space-xl);
	}

	.stack {
		display: grid;
		gap: var(--space-m);
	}
</style>
