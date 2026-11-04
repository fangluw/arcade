<script>
	import { asset } from '$app/paths';

	let { avatar, alt, text } = $props();
</script>

<img src={asset(avatar)} {alt} width="200" height="200" />
<p>{text}</p>
