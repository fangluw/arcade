<script>
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import PageMeta from '$lib/components/layout/PageMeta.svelte';

	const notFound = $derived(page.status === 404);
</script>

<PageMeta
	title={notFound ? 'Page not found' : 'Something went wrong'}
	description="This page could not be shown."
/>

<h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>
<p>
	{notFound
		? 'There is no page at this address. Check the link, or pick a page from the menu.'
		: `The page failed to load (error ${page.status}). Try again, or pick a page from the menu.`}
</p>
<p><a href={resolve('/')}>Go to the home page</a></p>
