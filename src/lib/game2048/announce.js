export function describe(event, status, score) {
	if (!event) return '';

	const parts = [];
	switch (event.type) {
		case 'new':
			parts.push(`New game, seed ${event.seed}. Score 0.`);
			if (event.tiles.length > 0) parts.push(`Starting tiles: ${event.tiles.map(place).join(' and ')}.`);
			break;
		case 'move':
			parts.push(`Moved ${event.direction}.`);
			if (event.points > 0) parts.push(`Merged for ${event.points} points.`);
			parts.push(`Score ${score}.`);
			if (event.spawned) parts.push(`New ${place(event.spawned)}.`);
			break;
		case 'blocked':
			parts.push(`Can't move ${event.direction}.`);
			break;
		case 'continue':
			parts.push(`Keep going. Score ${score}.`);
			break;
	}

	if (status === 'won') parts.push('You made 2048! Keep playing or start a new game.');
	if (status === 'over') parts.push(`Game over. No moves left. Final score ${score}.`);
	return parts.join(' ');
}

function place({ row, col, value }) {
	return `${value} at row ${row + 1}, column ${col + 1}`;
}
