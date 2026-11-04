import { readJSON, writeJSON } from './storage.js';

const STATS_KEY = 'arcade:2048:stats';

export const stats = $state({ best: 0 });

let loaded = false;

export function loadStats() {
	loaded = true;
	const saved = readJSON(STATS_KEY);
	if (Number.isInteger(saved?.best) && saved.best > stats.best) {
		stats.best = saved.best;
	}
}

export function recordScore(score) {
	if (!loaded) loadStats();
	if (score <= stats.best) return;
	stats.best = score;
	writeJSON(STATS_KEY, { best: stats.best });
}
