<script>
	import Button from '$lib/components/ui/Button.svelte';

	let { seed, maxSeed, onplay } = $props();

	const id = $props.id();
	let text = $state('');
	let submitted = $state(false);
	let input;

	const value = $derived(/^\d+$/.test(text.trim()) ? Number(text.trim()) : null);
	const valid = $derived(value !== null && value <= maxSeed);
	const showError = $derived(submitted && !valid);

	function handleSubmit(event) {
		event.preventDefault();
		submitted = true;
		if (!valid) {
			input.focus();
			return;
		}
		onplay(value);
		text = '';
		submitted = false;
	}
</script>

<form class="seed-form" onsubmit={handleSubmit} novalidate>
	<label for="{id}-seed">Seed</label>
	<div class="row">
		<input
			id="{id}-seed"
			type="text"
			inputmode="numeric"
			autocomplete="off"
			spellcheck="false"
			bind:value={text}
			bind:this={input}
			aria-invalid={showError ? 'true' : undefined}
			aria-describedby="{id}-hint"
		/>
		<Button type="submit">Play seed</Button>
	</div>
	<p id="{id}-hint" class="hint" class:error={showError}>
		{#if showError}
			Enter a whole number from 0 to {maxSeed}.
		{:else}
			This game's seed is {seed ?? '…'}. The same seed and moves always give the same tiles.
		{/if}
	</p>
</form>

<style>
	.seed-form {
		display: grid;
		gap: var(--space-3xs);
	}

	label {
		font-weight: 600;
	}

	.row {
		display: flex;
		gap: var(--space-2xs);
	}

	input {
		flex: 1;
		min-width: 0;
		min-height: var(--tap);
		padding: 0 var(--space-xs);
		color: var(--text);
		background: var(--surface);
		border: 2px solid var(--line);
		border-radius: 0;
	}

	input[aria-invalid='true'] {
		border-color: var(--highlight);
	}

	.hint {
		margin: 0;
		font-size: var(--step--1);
		color: var(--muted);
	}

	.error {
		font-weight: 600;
		color: var(--highlight);
	}
</style>
