<script>
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Game2048, MAX_SEED } from '$lib/game2048/game.svelte.js';
	import { stats, loadStats } from '$lib/game2048/stats.svelte.js';
	import Button from '$lib/components/ui/Button.svelte';
	import ScoreBoard from './ScoreBoard.svelte';
	import Board from './Board.svelte';
	import GameOverlay from './GameOverlay.svelte';
	import ArrowPad from './ArrowPad.svelte';
	import SeedForm from './SeedForm.svelte';
	import LiveRegion from './LiveRegion.svelte';

	const SLIDE_MS = 120;
	const KEY_DIRECTIONS = {
		ArrowUp: 'up',
		ArrowDown: 'down',
		ArrowLeft: 'left',
		ArrowRight: 'right'
	};

	const game = new Game2048();

	const best = $derived(Math.max(stats.best, game.score));
	const slideMs = $derived(prefersReducedMotion.current ? 0 : SLIDE_MS);
	const gained = $derived(game.lastEvent?.type === 'move' ? game.lastEvent.points : 0);
	const focusPanel = $derived(game.lastEvent?.type === 'move');

	onMount(() => {
		loadStats();
		game.start();
	});

	function handleKeydown(event) {
		const direction = KEY_DIRECTIONS[event.key];
		if (!direction || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
		if (isTyping(event.target) || !game.ready) return;
		event.preventDefault();
		game.move(direction);
	}

	function isTyping(target) {
		return (
			target instanceof HTMLElement &&
			(target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
		);
	}

	const moveTiles = (direction) => game.move(direction);
	const startNewGame = () => game.newGame();
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="game">
	<div class="toolbar">
		<ScoreBoard score={game.score} {best} {gained} turn={game.turn} animate={slideMs > 0} />
		<Button variant="primary" onclick={startNewGame}>New game</Button>
	</div>

	<Board tiles={game.tiles} board={game.board} {slideMs} onswipe={moveTiles}>
		{#if game.status === 'won'}
			<GameOverlay
				title="You made 2048!"
				message={game.over
					? `No moves left. Final score ${game.score}.`
					: `Score ${game.score}. Keep going for a bigger tile, or start again.`}
				focusOnShow={focusPanel}
				fadeMs={slideMs ? 200 : 0}
			>
				{#if !game.over}
					<Button variant="primary" onclick={() => game.continuePlaying()}>Keep playing</Button>
				{/if}
				<Button onclick={startNewGame}>New game</Button>
			</GameOverlay>
		{:else if game.status === 'over'}
			<GameOverlay
				title="Game over"
				message={`No moves left. Final score ${game.score}.`}
				focusOnShow={focusPanel}
				fadeMs={slideMs ? 200 : 0}
			>
				<Button variant="primary" onclick={startNewGame}>New game</Button>
			</GameOverlay>
		{/if}
	</Board>

	<ArrowPad onmove={moveTiles} disabled={game.status !== 'playing'} />

	<SeedForm seed={game.seed} maxSeed={MAX_SEED} onplay={(seed) => game.newGame(seed)} />

	<LiveRegion message={game.announcement} />
</div>

<style>
	.game {
		display: grid;
		gap: var(--space-m);
		width: min(100%, 32rem);
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-s);
	}
</style>
