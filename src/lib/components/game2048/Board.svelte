<script>
	import { swipe } from '$lib/attachments/swipe.js';
	import Tile from './Tile.svelte';

	let { tiles, board, slideMs = 120, onswipe, children } = $props();

	const size = $derived(board.length);
	const squares = $derived(Array.from({ length: size * size }, (_, i) => i));
	const columns = $derived(Array.from({ length: size }, (_, i) => i));
</script>

<div class="board" style:--size={size} style:--slide-duration={`${slideMs}ms`} {@attach swipe(onswipe)}>
	<div class="squares" aria-hidden="true">
		{#each squares as square (square)}
			<div class="square"></div>
		{/each}
	</div>

	<div class="tiles" aria-hidden="true">
		{#each tiles as tile (tile.id)}
			<Tile
				value={tile.value}
				row={tile.row}
				col={tile.col}
				origin={tile.origin}
				consumed={tile.consumed}
				{slideMs}
			/>
		{/each}
	</div>

	<table class="sr-only">
		<caption>Board</caption>
		<thead>
			<tr>
				<td></td>
				{#each columns as col (col)}
					<th scope="col">Column {col + 1}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each board as values, row}
				<tr>
					<th scope="row">Row {row + 1}</th>
					{#each values as value, col}
						<td>{value === 0 ? 'empty' : value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	{@render children?.()}
</div>

<style>
	.board {
		--gap: clamp(0.375rem, 2vw, 0.75rem);
		position: relative;
		container-type: inline-size;
		width: min(100%, max(65vh, 17rem));
		aspect-ratio: 1;
		background: var(--surface);
		border: var(--border);
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
	}

	.squares,
	.tiles {
		position: absolute;
		inset: var(--gap);
	}

	.squares {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		gap: var(--gap);
	}

	.square {
		background: var(--surface-raised);
	}
</style>
