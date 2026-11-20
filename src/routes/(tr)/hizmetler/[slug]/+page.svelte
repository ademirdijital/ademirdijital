<script lang="ts">
	import ServiceDetail from '#lib/pages/ServiceDetail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ServiceDetail id={data.serviceId} />
