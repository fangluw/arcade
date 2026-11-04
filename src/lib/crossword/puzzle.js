const DIRECTION_NAMES = { across: 'Across', down: 'Down' };

export function otherDirection(direction) {
	return direction === 'across' ? 'down' : 'across';
}

export function buildPuzzle({ size, entries }) {
	const cells = Array.from({ length: size * size }, (_, index) => ({
		index,
		row: Math.floor(index / size),
		col: index % size,
		solution: null,
		number: null,
		across: null,
		down: null,
		block: false,
		label: ''
	}));

	const placed = entries.map((entry) => {
		const id = `${entry.number}-${entry.direction}`;
		const answer = entry.answer.toUpperCase();

		const indexes = [...answer].map((letter, offset) => {
			const row = entry.row + (entry.direction === 'down' ? offset : 0);
			const col = entry.col + (entry.direction === 'across' ? offset : 0);
			if (row >= size || col >= size) {
				throw new Error(`${id} (${answer}) runs off the edge of the grid`);
			}

			const cell = cells[row * size + col];
			if (cell.solution && cell.solution !== letter) {
				throw new Error(
					`${id} (${answer}) puts ${letter} at row ${row + 1}, column ${col + 1}, which already has ${cell.solution}`
				);
			}
			cell.solution = letter;
			cell[entry.direction] = id;
			return cell.index;
		});

		cells[indexes[0]].number = entry.number;

		return {
			...entry,
			id,
			answer,
			cells: indexes,
			name: `${entry.number} ${DIRECTION_NAMES[entry.direction]}`,
			clueText: `${entry.clue} (${answer.length})`
		};
	});

	const byId = new Map(placed.map((entry) => [entry.id, entry]));

	for (const cell of cells) {
		cell.block = cell.solution === null;
		if (cell.block) continue;

		const parts = [`Row ${cell.row + 1}, column ${cell.col + 1}`];
		if (cell.across) parts.push(byId.get(cell.across).name);
		if (cell.down) parts.push(byId.get(cell.down).name);
		cell.label = parts.join(', ');
	}

	const byNumber = (a, b) => a.number - b.number;

	return {
		size,
		cells,
		entries: placed,
		across: placed.filter((entry) => entry.direction === 'across').sort(byNumber),
		down: placed.filter((entry) => entry.direction === 'down').sort(byNumber)
	};
}
