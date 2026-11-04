
<script>
	let { solved, revealed } = $props();

	const message = $derived(
		solved
			? 'Solved! Nice work.'
			: revealed
				? 'Showing the solution. Hide it to get your letters back.'
				: ''
	);
</script>

<p class="status" class:solved role="status">{message}</p>

<style>
	.status {
		min-height: 1.5em;
		margin: 0;
		color: var(--muted);
	}

	.solved {
		color: var(--highlight);
		font-weight: 600;
	}
</style>