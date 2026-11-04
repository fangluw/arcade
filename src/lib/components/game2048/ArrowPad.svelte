<script>
	let { onmove, disabled = false } = $props();

	const arrows = [
		{ direction: 'up', label: 'Move up', angle: 0 },
		{ direction: 'left', label: 'Move left', angle: -90 },
		{ direction: 'down', label: 'Move down', angle: 180 },
		{ direction: 'right', label: 'Move right', angle: 90 }
	];
</script>

<div class="pad" role="group" aria-label="Move tiles">
	{#each arrows as arrow (arrow.direction)}
		<button
			type="button"
			aria-label={arrow.label}
			{disabled}
			style:grid-area={arrow.direction}
			onclick={() => onmove(arrow.direction)}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true" style:transform={`rotate(${arrow.angle}deg)`}>
				<path d="M5 15.5l7-7 7 7" />
			</svg>
		</button>
	{/each}
</div>

<style>
	.pad {
		display: none;
		grid-template-areas:
			'. up .'
			'left down right';
		grid-template-columns: repeat(3, 4rem);
		gap: var(--space-2xs);
		justify-content: center;
	}

	@media (pointer: coarse), (max-width: 600px) {
		.pad {
			display: grid;
		}
	}

	button {
		display: grid;
		place-items: center;
		height: 4rem;
		padding: 0;
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--line);
		cursor: pointer;
		touch-action: manipulation;
	}

	button:active:not(:disabled) {
		color: var(--on-color);
		background: var(--highlight);
	}

	button:focus-visible {
		outline: var(--focus-ring);
		outline-offset: 3px;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	svg {
		width: 1.75rem;
		height: 1.75rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 3;
	}
</style>
