<script>
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Crossword from '$lib/components/crossword/Crossword.svelte';
	import { CrosswordGame } from '$lib/crossword/game.svelte.js';
	import { miniCrossword } from '$lib/data/crossword.js';

	const game = new CrosswordGame(miniCrossword);
</script>

<PageMeta title="Mini Crossword" description="A mini crossword game." />

<h1>Mini Crossword</h1>

<Crossword {game} />
