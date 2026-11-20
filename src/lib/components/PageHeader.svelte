<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { SITE_URL } from '#lib/site.ts';
	import { page } from '$app/state';
	import JsonLd from './JsonLd.svelte';

	interface Crumb {
		label: string;
		href: string;
	}

	interface Props {
		title: string;
		lede?: string;
		/** Intermediate crumbs between "Home" and the current page. */
		crumbs?: Crumb[];
		children?: Snippet;
	}

	let { title, lede, crumbs = [], children }: Props = $props();

	const i18n = useI18n();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ label: i18n.t.nav.home, href: i18n.path('home') },
			...crumbs,
			{ label: title, href: page.url.pathname }
		].map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.label,
			item: `${SITE_URL}${crumb.href}`
		}))
	});
</script>

<JsonLd data={breadcrumbLd} />

<header class="page-header pt-32 pb-14 md:pt-44 md:pb-20">
	<div class="container-site">
		<nav aria-label={i18n.t.nav.breadcrumb}>
			<ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-chrome-400">
				<li>
					<a href={i18n.path('home')} class="link-line hover:text-chrome-100">{i18n.t.nav.home}</a>
				</li>
				{#each crumbs as crumb (crumb.href)}
					<li aria-hidden="true" class="text-chrome-500">/</li>
					<li>
						<a href={crumb.href} class="link-line hover:text-chrome-100">{crumb.label}</a>
					</li>
				{/each}
				<li aria-hidden="true" class="text-chrome-500">/</li>
				<li aria-current="page" class="text-chrome-200">{title}</li>
			</ol>
		</nav>

		<div class="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
			<h1 class="display-xl text-chrome intro-line lg:col-span-8">{title}</h1>
			{#if lede}
				<p class="lede intro-line intro-delay max-w-[52ch] text-chrome-300 lg:col-span-4 lg:pb-2">
					{lede}
				</p>
			{/if}
		</div>

		{@render children?.()}
	</div>
</header>

<style>
	.page-header {
		background: radial-gradient(120% 80% at 85% 0%, var(--color-pine-800) 0%, transparent 60%);
	}

	.intro-line {
		animation: rise 900ms var(--ease-out-soft) both;
	}

	.intro-delay {
		animation-delay: 120ms;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 14px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
