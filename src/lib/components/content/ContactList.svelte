<script>
	let { links } = $props();
</script>

<address>
	<ul>
		{#each links as link (link.href)}
			<li><a href={link.href}>{link.label}</a></li>
		{/each}
	</ul>
</address>

<style>
	li + li {
		margin-top: var(--space-2xs);
	}
</style>
