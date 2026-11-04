<script>
	let {
		index,
		number = null,
		label,
		letter = '',
		active = false,
		highlighted = false,
		revealed = false,
		onselect,
		onletter,
		onkeydown
	} = $props();

	function handleInput(event) {
		const input = event.currentTarget;
		const typed = (event.data ?? input.value).slice(-1);

		input.value = letter;

		if (/^[a-z]$/i.test(typed)) onletter(typed.toUpperCase());
		else if (event.inputType?.startsWith('delete')) onletter('');
	}
</script>

<div class="cell" class:highlighted class:active class:revealed>
	{#if number}
		<span class="num" aria-hidden="true">{number}</span>
	{/if}
	<input
		type="text"
		data-index={index}
		value={letter}
		aria-label={label}
		tabindex={active ? 0 : -1}
		readonly={revealed}
		autocomplete="off"
		autocapitalize="characters"
		spellcheck="false"
		onpointerdown={() => onselect(true)}
		onfocus={() => onselect(false)}
		oninput={handleInput}
		{onkeydown}
	/>
</div>

<style>
	.cell {
		position: relative;
		aspect-ratio: 1;
		background: var(--paper);
	}

	.highlighted {
		background: var(--clue);
	}

	.active {
		background: var(--highlight);
	}

	.num {
		position: absolute;
		top: 3px;
		left: 4px;
		font-size: var(--step--1);
		line-height: 1;
		color: var(--ink);
		pointer-events: none;
	}

	input {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		border-radius: 0;
		background: transparent;
		text-align: center;
		font-size: var(--step-2);
		font-weight: bold;
		text-transform: uppercase;
		color: var(--ink);
		caret-color: transparent;
		cursor: pointer;
	}

	input:focus {
		outline: none;
	}

	input:focus-visible {
		outline: 3px solid var(--on-color);
		outline-offset: -3px;
	}

	.revealed input {
		color: var(--revealed);
	}
</style>
