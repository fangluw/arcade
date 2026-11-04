<script>
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import Section from '$lib/components/content/Section.svelte';
	import Game from '$lib/components/game2048/Game.svelte';
</script>

<PageMeta title="2048" description="Slide numbered tiles and merge matching pairs to reach 2048." />

<h1>2048</h1>
<p class="intro">
	Slide the tiles with the arrow keys. Two tiles with the same number merge into one. Make a 2048
	tile to win.
</p>

<Game />

<Section heading="How to play">
	<ul class="rules">
		<li>
			Every move slides all the tiles as far as they go. On a touch screen, swipe the board or use the
			arrow buttons under it.
		</li>
		<li>Tiles merge once per move, so a row of 2 2 2 2 becomes 4 4, not 8.</li>
		<li>Each merge adds the new tile's value to your score.</li>
		<li>
			After each move a 2 or a 4 appears in an empty square. A move that changes nothing doesn't
			count.
		</li>
		<li>Reach 2048 to win, then keep going if you like. The game ends when no move is left.</li>
		<li>
			Your game and best score are saved in this browser. Enter a seed to replay the same tiles.
		</li>
	</ul>
</Section>

<style>
	.intro {
		max-width: 60ch;
		margin-bottom: var(--space-l);
	}

	.rules {
		display: grid;
		gap: var(--space-2xs);
		margin: 0;
		padding-left: var(--space-m);
	}
</style>
