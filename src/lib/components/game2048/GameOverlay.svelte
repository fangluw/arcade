<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { title, message = '', focusOnShow = false, fadeMs = 200, children } = $props();

	const id = $props.id();
	let panel;

	onMount(() => {
		if (focusOnShow) panel.querySelector('button')?.focus();
	});
</script>

<div
	class="overlay"
	role="dialog"
	aria-labelledby="{id}-title"
	aria-describedby="{id}-message"
	bind:this={panel}
	transition:fade={{ duration: fadeMs }}
>
	<h2 id="{id}-title">{title}</h2>
	<p id="{id}-message">{message}</p>
	<div class="actions">
		{@render children?.()}
	</div>
</div>

<style>
	.overlay {
		position: absolute;
		inset: 0;
		z-index: 3;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: var(--space-s);
		padding: var(--space-m);
		text-align: center;
		background: color-mix(in srgb, var(--bg) 92%, transparent);
	}

	h2 {
		margin: 0;
	}

	p {
		max-width: 24ch;
		margin: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-xs);
	}
</style>
