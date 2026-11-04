<script>
	import { CrosswordGame } from '$lib/crossword/game.svelte.js';
	import { miniCrossword } from '$lib/data/crossword.js';
	import Section from '../content/Section.svelte';
	import CrosswordGrid from './CrosswordGrid.svelte';
	import CrosswordControls from './CrosswordControls.svelte';
	import GameStatus from './GameStatus.svelte';
	import ClueList from './ClueList.svelte';

	const game = new CrosswordGame(miniCrossword);

	const shownLetters = $derived(game.cells.map((cell) => game.displayAt(cell.index)));

	const selectEntry = (entry) => game.selectEntry(entry);
</script>

<Section heading="Puzzle">
	<CrosswordGrid
		size={game.size}
		cells={game.cells}
		letters={shownLetters}
		activeIndex={game.activeIndex}
		activeCells={game.activeCells}
		revealed={game.revealed}
		focusRequest={game.focusRequest}
		onselect={(index, toggleIfActive) => game.select(index, toggleIfActive)}
		onletter={(index, letter) => game.type(index, letter)}
		onmove={(rowStep, colStep) => game.move(rowStep, colStep)}
		onbackspace={() => game.backspace()}
		onerase={() => game.erase()}
		ontoggledirection={() => game.toggleDirection()}
	/>
	<CrosswordControls
		revealed={game.revealed}
		ontogglereveal={() => game.toggleReveal()}
		onclear={() => game.clear()}
	/>
	<GameStatus solved={game.solved} revealed={game.revealed} />
</Section>

<Section heading="Clues">
	<div class="clue-columns">
		<ClueList
			heading="Across"
			entries={game.across}
			activeId={game.activeEntry?.id}
			crossingId={game.crossingEntry?.id}
			onselect={selectEntry}
		/>
		<ClueList
			heading="Down"
			entries={game.down}
			activeId={game.activeEntry?.id}
			crossingId={game.crossingEntry?.id}
			onselect={selectEntry}
		/>
	</div>
</Section>

<style>
	.clue-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--space-m);
	}
</style>
