<script>
	let { heading, entries, activeId = null, crossingId = null, onselect } = $props();
</script>

<div>
	<h3>{heading}</h3>
	<ol>
		{#each entries as entry (entry.id)}
			<li>
				<button
					type="button"
					class:active={entry.id === activeId}
					class:crossing={entry.id === crossingId}
					aria-current={entry.id === activeId ? 'true' : undefined}
					onclick={() => onselect(entry)}
				>
					<span class="number">{entry.number}</span>
					<span>{entry.clueText}</span>
				</button>
			</li>
		{/each}
	</ol>
</div>

<style>
	h3 {
		margin: 0 0 var(--space-2xs);
	}

	ol {
		display: grid;
		gap: var(--space-3xs);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	button {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
		width: 100%;
		min-height: var(--tap);
		padding: var(--space-2xs) var(--space-xs);
		text-align: left;
		color: var(--text);
		background: transparent;
		border: 2px solid transparent;
		cursor: pointer;
	}

	button:hover {
		border-color: var(--clue);
	}

	button:focus-visible {
		outline: var(--focus-ring);
		outline-offset: 2px;
	}

	.crossing {
		background: var(--surface);
	}

	.active {
		background: var(--highlight);
		color: var(--on-color);
	}

	.number {
		min-width: 1.5ch;
		font-weight: 600;
	}
</style>
