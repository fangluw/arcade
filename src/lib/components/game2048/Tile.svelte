<script>
	import { scale } from 'svelte/transition';
	import { backOut, cubicOut } from 'svelte/easing';

	let { value, row, col, origin = 'start', consumed = false, slideMs = 120 } = $props();

	const shade = $derived(Math.min(value, 4096));
	const digits = $derived(String(value).length);
	const fontSize = $derived(
		digits <= 2 ? '11cqi' : digits === 3 ? '9cqi' : digits === 4 ? '7.5cqi' : '6cqi'
	);

	function entrance() {
		const animated = slideMs > 0;
		if (origin === 'merge') {
			return { start: 0.5, delay: slideMs, duration: animated ? 200 : 0, easing: backOut };
		}
		if (origin === 'spawn') {
			return { start: 0, delay: slideMs, duration: animated ? 160 : 0, easing: cubicOut };
		}
		return { start: 0.6, duration: animated ? 180 : 0, easing: cubicOut };
	}
</script>

<div class="tile" class:consumed style:--row={row} style:--col={col}>
	<div
		class="face"
		class:light={value >= 128}
		class:goal={value >= 2048}
		style:background={`var(--tile-${shade})`}
		style:font-size={fontSize}
		in:scale={entrance()}
	>
		{value}
	</div>
</div>

<style>
	.tile {
		--tile-size: calc((100% - (var(--size) - 1) * var(--gap)) / var(--size));
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: var(--tile-size);
		height: var(--tile-size);
		transform: translate(
			calc(var(--col) * (100% + var(--gap))),
			calc(var(--row) * (100% + var(--gap)))
		);
		transition: transform var(--slide-duration) ease-in-out;
	}

	.consumed {
		z-index: 1;
	}

	.face {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		color: var(--on-color);
		font-size: var(--step-2);
		font-weight: 600;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}

	.light {
		color: var(--text);
	}

	.goal {
		outline: 3px solid var(--highlight);
		outline-offset: -3px;
	}
</style>
