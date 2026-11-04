<script>
	let { revealed, ontogglereveal, onclear } = $props();
</script>

<div class="controls">
	<button type="button" onclick={ontogglereveal}>
		{revealed ? 'Hide solution' : 'Reveal solution'}
	</button>
	<button type="button" onclick={onclear}>Clear</button>
</div>

<style>
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	button {
		min-height: var(--tap);
		padding: 0 var(--space-s);
		font-weight: 600;
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--line);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button:hover:not(:disabled) {
		background: var(--clue);
		color: var(--on-color);
	}

	button:focus-visible {
		outline: var(--focus-ring);
		outline-offset: 3px;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
