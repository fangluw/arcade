export function tilesFromBoard(board, makeId) {
	const tiles = [];
	board.forEach((values, row) => {
		values.forEach((value, col) => {
			if (value !== 0) tiles.push({ id: makeId(), value, row, col, origin: 'start', consumed: false });
		});
	});
	return tiles;
}

export function boardFromTiles(tiles, size) {
	const board = Array.from({ length: size }, () => Array(size).fill(0));
	for (const tile of tiles) {
		if (!tile.consumed) board[tile.row][tile.col] = tile.value;
	}
	return board;
}

export function nextTiles(tiles, slid, spawned, makeId) {
	const moveFrom = new Map(slid.moves.map((step) => [squareKey(step.from), step]));

	const next = tiles
		.filter((tile) => !tile.consumed)
		.map((tile) => {
			const step = moveFrom.get(squareKey(tile));
			if (!step) throw new Error(`No move found for the tile at row ${tile.row}, column ${tile.col}`);
			return { ...tile, row: step.to.row, col: step.to.col, consumed: step.merged };
		});

	for (const { row, col, value } of slid.merges) {
		next.push({ id: makeId(), value, row, col, origin: 'merge', consumed: false });
	}
	if (spawned) {
		next.push({ id: makeId(), ...spawned, origin: 'spawn', consumed: false });
	}
	return next;
}

export function findSpawn(before, after) {
	for (let row = 0; row < before.length; row += 1) {
		for (let col = 0; col < before[row].length; col += 1) {
			if (before[row][col] === 0 && after[row][col] !== 0) {
				return { row, col, value: after[row][col] };
			}
		}
	}
	return null;
}

function squareKey({ row, col }) {
	return `${row},${col}`;
}
