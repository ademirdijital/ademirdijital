<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { page } from '$app/state';

	const i18n = useI18n();
	const t = $derived(i18n.t.error);
	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? t.notFoundTitle : t.genericTitle} | Ademir Dijital</title>
	<meta name="robots" content="noindex">
</svelte:head>

<section class="flex min-h-[80vh] items-center pt-32 pb-20">
	<div class="container-site">
		<p class="display-sm text-chrome-400 tabular-nums">{page.status}</p>
		<h1 class="display-xl text-chrome mt-4 max-w-[18ch]">
			{notFound ? t.notFoundTitle : t.genericTitle}
		</h1>
		<p class="lede mt-6 max-w-[52ch] text-chrome-300">
			{notFound ? t.notFoundText : t.genericText}
		</p>
		<a href={i18n.path('home')} class="btn btn-chrome mt-10">{t.back}</a>
	</div>
</section>
