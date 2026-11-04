<script>
	import { fly } from 'svelte/transition';

	let { score, best, gained = 0, turn = 0, animate = true } = $props();
</script>

<dl class="scores">
	<div class="box">
		<dt>Score</dt>
		<dd>
			<span>{score}</span>
			{#key turn}
				{#if gained > 0}
					<span class="gained" aria-hidden="true" in:fly|global={{ y: 8, duration: animate ? 300 : 0 }}>
						+{gained}
					</span>
				{/if}
			{/key}
		</dd>
	</div>
	<div class="box">
		<dt>Best</dt>
		<dd><span>{best}</span></dd>
	</div>
</dl>

<style>
	.scores {
		display: flex;
		gap: var(--space-xs);
		margin: 0;
	}

	.box {
		min-width: 6rem;
		padding: var(--space-2xs) var(--space-xs);
		background: var(--surface);
		border: 2px solid var(--line);
	}

	dt {
		font-size: var(--step--1);
		color: var(--muted);
	}

	dd {
		display: flex;
		align-items: baseline;
		gap: var(--space-3xs);
		margin: 0;
		font-size: var(--step-2);
		font-weight: 600;
		line-height: 1.2;
		font-variant-numeric: tabular-nums;
	}

	.gained {
		font-size: var(--step--1);
		color: var(--highlight);
	}
</style>
