<script>
	import CrosswordCell from './CrosswordCell.svelte';

	let {
		size,
		cells,
		letters,
		activeIndex,
		activeCells,
		revealed,
		focusRequest,
		onselect,
		onletter,
		onmove,
		onbackspace,
		onerase,
		ontoggledirection
	} = $props();

	let gridEl = $state();
	let handledFocusRequest = 0;

	$effect(() => {
		const index = activeIndex;
		const requested = focusRequest !== handledFocusRequest;
		handledFocusRequest = focusRequest;

		if (requested || gridEl.contains(document.activeElement)) {
			gridEl.querySelector(`input[data-index="${index}"]`)?.focus();
		}
	});

	const arrowSteps = {
		ArrowUp: [-1, 0],
		ArrowDown: [1, 0],
		ArrowLeft: [0, -1],
		ArrowRight: [0, 1]
	};

	function handleKeydown(event) {
		const step = arrowSteps[event.key];
		if (step) {
			event.preventDefault();
			onmove(...step);
		} else if (event.key === 'Backspace') {
			event.preventDefault();
			onbackspace();
		} else if (event.key === 'Delete') {
			event.preventDefault();
			onerase();
		} else if (event.key === ' ') {
			event.preventDefault();
			ontoggledirection();
		}
	}
</script>

<div class="scroller">
	<div
		class="grid"
		role="group"
		aria-label="Crossword grid. Type to fill squares, arrow keys to move, space to switch between across and down."
		style:--size={size}
		bind:this={gridEl}
	>
		{#each cells as cell (cell.index)}
			{#if cell.block}
				<div class="block"></div>
			{:else}
				<CrosswordCell
					index={cell.index}
					number={cell.number}
					label={cell.label}
					letter={letters[cell.index]}
					active={cell.index === activeIndex}
					highlighted={activeCells.has(cell.index)}
					{revealed}
					onselect={(toggleIfActive) => onselect(cell.index, toggleIfActive)}
					onletter={(letter) => onletter(cell.index, letter)}
					onkeydown={handleKeydown}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		gap: 2px;
		width: min(100%, 350px);
		background-color: var(--ink);
		border: 2px solid var(--ink);
	}

	.block {
		aspect-ratio: 1;
		background: var(--ink);
	}

	@media (max-width: 600px) {
		.scroller {
			overflow-x: auto;
		}

		.grid {
			grid-template-columns: repeat(var(--size), var(--tap));
			width: max-content;
		}
	}
</style>
