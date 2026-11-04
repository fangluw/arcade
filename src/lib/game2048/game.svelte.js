import {
	canMove,
	createRng,
	hasMoves,
	hasWon,
	move,
	newGame,
	score as pointsFor,
	slide,
	spawn
} from '@fangluwe/arcade-core';
import { describe } from './announce.js';
import { recordScore } from './stats.svelte.js';
import { readJSON, writeJSON } from './storage.js';
import { boardFromTiles, findSpawn, nextTiles, tilesFromBoard } from './tiles.js';

const SIZE = 4;
const SAVE_KEY = 'arcade:2048:game';
const SAVE_VERSION = 1;
export const MAX_SEED = 2 ** 32 - 1;

let lastTileId = 0;
const makeTileId = () => (lastTileId += 1);

export function isValidSeed(seed) {
	return Number.isInteger(seed) && seed >= 0 && seed <= MAX_SEED;
}

function randomSeed() {
	return Math.floor(Math.random() * (MAX_SEED + 1));
}

export class Game2048 {
	tiles = $state([]);
	score = $state(0);
	seed = $state(null);
	turn = $state(0);
	keepPlaying = $state(false);
	lastEvent = $state(null);

	board = $derived(boardFromTiles(this.tiles, SIZE));
	ready = $derived(this.tiles.length > 0);
	won = $derived(hasWon(this.board));
	over = $derived(this.ready && !hasMoves(this.board));
	status = $derived(this.won && !this.keepPlaying ? 'won' : this.over ? 'over' : 'playing');
	announcement = $derived(describe(this.lastEvent, this.status, this.score));

	#random = Math.random;
	#draws = 0;

	start() {
		if (this.ready) return;
		if (!this.#restore(readJSON(SAVE_KEY))) this.newGame();
	}

	newGame(seed = randomSeed()) {
		if (!isValidSeed(seed)) throw new RangeError(`seed must be a whole number from 0 to ${MAX_SEED}`);

		this.#useSeed(seed, 0);
		this.seed = seed;
		this.tiles = tilesFromBoard(newGame(this.#random, SIZE), makeTileId);
		this.score = 0;
		this.turn = 0;
		this.keepPlaying = false;
		this.lastEvent = {
			type: 'new',
			seed,
			tiles: this.tiles.map(({ row, col, value }) => ({ row, col, value }))
		};
		this.#save();
	}

	move(direction) {
		if (this.status !== 'playing') return false;

		const before = this.board;
		if (!canMove(before, direction)) {
			this.lastEvent = { type: 'blocked', direction };
			return false;
		}

		const moved = move(before, direction);
		const after = spawn(moved, this.#random);
		const points = pointsFor(before, direction);
		const spawned = findSpawn(moved, after);

		this.tiles = nextTiles(this.tiles, slide(before, direction), spawned, makeTileId);
		this.score += points;
		this.turn += 1;
		this.lastEvent = { type: 'move', direction, points, spawned };

		recordScore(this.score);
		this.#save();
		return true;
	}

	continuePlaying() {
		this.keepPlaying = true;
		this.lastEvent = { type: 'continue' };
		this.#save();
	}

	#useSeed(seed, draws) {
		const random = createRng(seed);
		for (let i = 0; i < draws; i += 1) random();
		this.#draws = draws;
		this.#random = () => {
			this.#draws += 1;
			return random();
		};
	}

	#save() {
		writeJSON(SAVE_KEY, {
			version: SAVE_VERSION,
			board: this.board,
			score: this.score,
			seed: this.seed,
			draws: this.#draws,
			turn: this.turn,
			keepPlaying: this.keepPlaying
		});
	}

	#restore(saved) {
		if (!isSavedGame(saved)) return false;

		this.#useSeed(saved.seed, saved.draws);
		this.seed = saved.seed;
		this.tiles = tilesFromBoard(saved.board, makeTileId);
		this.score = saved.score;
		this.turn = saved.turn;
		this.keepPlaying = saved.keepPlaying;
		this.lastEvent = null;
		return true;
	}
}

function isSavedGame(saved) {
	if (!saved || saved.version !== SAVE_VERSION) return false;

	const { board, score, seed, draws, turn, keepPlaying } = saved;
	const wholeNumber = (n) => Number.isInteger(n) && n >= 0;
	const boardOk =
		Array.isArray(board) &&
		board.length === SIZE &&
		board.every((row) => Array.isArray(row) && row.length === SIZE && row.every(wholeNumber)) &&
		board.flat().some((value) => value > 0);

	return (
		boardOk &&
		wholeNumber(score) &&
		isValidSeed(seed) &&
		wholeNumber(draws) &&
		draws < 10_000_000 &&
		wholeNumber(turn) &&
		typeof keepPlaying === 'boolean'
	);
}
