<script>
	let { children, variant = 'secondary', type = 'button', ...rest } = $props();
</script>

<button {type} class:primary={variant === 'primary'} {...rest}>
	{@render children?.()}
</button>

<style>
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

	.primary {
		color: var(--on-color);
		background: var(--highlight);
	}

	button:hover:not(:disabled) {
		color: var(--on-color);
		background: var(--clue);
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
