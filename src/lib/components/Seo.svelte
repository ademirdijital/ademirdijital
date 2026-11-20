<script lang="ts">
	import type { Seo } from '#lib/content/types.ts';

	interface Props {
		seo: Seo;
	}

	let { seo }: Props = $props();
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description}>
	<meta property="og:title" content={seo.title}>
	<meta property="og:description" content={seo.description}>
	<meta name="twitter:title" content={seo.title}>
	<meta name="twitter:description" content={seo.description}>
</svelte:head>
