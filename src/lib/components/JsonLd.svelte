<script lang="ts">
	interface Props {
		data: Record<string, unknown>;
	}

	let { data }: Props = $props();

	// `<` is escaped so content can never close the script element early.
	const json = $derived(JSON.stringify(data).replace(/</g, '\\u003c'));
</script>

<svelte:head> {@html `<script type="application/ld+json">${json}</script>`} </svelte:head>
