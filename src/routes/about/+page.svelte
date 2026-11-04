<script>
	import PageMeta from '$lib/components/layout/PageMeta.svelte';
	import ProfileIntro from '$lib/components/content/ProfileIntro.svelte';
	import CardSection from '$lib/components/content/CardSection.svelte';
	import { bio, experience, education } from '$lib/data/profile.js';
</script>

<PageMeta title="About" description="Experience and education information of Carmen." />

<h1>About Me</h1>
<ProfileIntro avatar={bio.avatar} alt={bio.avatarAlt} text={bio.text} />

<CardSection heading="Experience" items={experience} />
<CardSection heading="Education" items={education} />
