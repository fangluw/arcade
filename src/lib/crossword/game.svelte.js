import { buildPuzzle, otherDirection } from './puzzle.js';

export class CrosswordGame {
	direction = $state('across');
	activeIndex = $state(-1);
	letters = $state([]);
	revealed = $state(false);
	focusRequest = $state(0);

	activeEntry = $derived(this.entryAt(this.activeIndex, this.direction));
	crossingEntry = $derived(this.entryAt(this.activeIndex, otherDirection(this.direction)));
	activeCells = $derived(new Set(this.activeEntry?.cells ?? []));

	solved = $derived(
		this.cells.every((cell) => cell.block || this.letters[cell.index] === cell.solution)
	);

	size;
	cells;
	across;
	down;
	#entriesById;

	constructor(definition) {
		const puzzle = buildPuzzle(definition);
		this.size = puzzle.size;
		this.cells = puzzle.cells;
		this.across = puzzle.across;
		this.down = puzzle.down;
		this.#entriesById = new Map(puzzle.entries.map((entry) => [entry.id, entry]));

		this.letters = puzzle.cells.map(() => '');
		this.activeIndex = puzzle.cells.find((cell) => !cell.block)?.index ?? -1;
	}

	entryAt(index, direction) {
		const id = this.cells[index]?.[direction];
		return id ? this.#entriesById.get(id) : null;
	}

	displayAt(index) {
		return this.revealed ? this.cells[index].solution : this.letters[index];
	}

	select(index, toggleIfActive = false) {
		if (index !== this.activeIndex) this.#activate(index);
		else if (toggleIfActive) this.toggleDirection();
	}

	selectEntry(entry) {
		this.direction = entry.direction;
		this.activeIndex = entry.cells.find((index) => !this.letters[index]) ?? entry.cells[0];
		this.focusRequest += 1;
	}

	toggleDirection() {
		const next = otherDirection(this.direction);
		if (this.entryAt(this.activeIndex, next)) this.direction = next;
	}

	move(rowStep, colStep) {
		const axis = colStep !== 0 ? 'across' : 'down';
		if (axis !== this.direction && this.entryAt(this.activeIndex, axis)) {
			this.direction = axis;
			return;
		}

		const { row, col } = this.cells[this.activeIndex];
		for (
			let r = row + rowStep, c = col + colStep;
			r >= 0 && r < this.size && c >= 0 && c < this.size;
			r += rowStep, c += colStep
		) {
			const cell = this.cells[r * this.size + c];
			if (!cell.block) {
				this.#activate(cell.index);
				return;
			}
		}
	}

	type(index, letter) {
		if (this.revealed) return;
		this.select(index);
		this.letters[index] = letter;
		if (letter) this.#step(1);
	}

	backspace() {
		if (this.revealed) return;
		if (this.letters[this.activeIndex]) {
			this.letters[this.activeIndex] = '';
			return;
		}
		this.#step(-1);
		this.letters[this.activeIndex] = '';
	}

	erase() {
		if (!this.revealed) this.letters[this.activeIndex] = '';
	}

	toggleReveal() {
		this.revealed = !this.revealed;
	}

	clear() {
		this.letters = this.cells.map(() => '');
		this.revealed = false;
	}

	#activate(index) {
		this.activeIndex = index;
		if (!this.entryAt(index, this.direction)) this.direction = otherDirection(this.direction);
	}

	#step(delta) {
		const cells = this.activeEntry?.cells;
		if (!cells) return;
		const next = cells[cells.indexOf(this.activeIndex) + delta];
		if (next !== undefined) this.activeIndex = next;
	}
}
