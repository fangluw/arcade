<script>
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import ContactList from '$lib/components/content/ContactList.svelte';
	import { contactLinks } from '$lib/data/profile.js';
</script>

<PageMeta title="Contact" description="Carmen's contact information and online profiles." />

<h1>Contact Information</h1>

<section>
	<ContactList links={contactLinks} />
</section>
