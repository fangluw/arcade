<script>
	let { message = '' } = $props();
</script>

<p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{message}</p>
