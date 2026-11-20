<script lang="ts">
	import './layout.css';
	import fontLatin from '#lib/assets/fonts/archivo-latin.woff2?url';
	import fontLatinExt from '#lib/assets/fonts/archivo-latin-ext.woff2?url';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import JsonLd from '#lib/components/JsonLd.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { alternatesFor, locales, ogLocales, pagePath, serviceIds } from '#lib/i18n/index.ts';
	import { contact, SITE_NAME, SITE_URL } from '#lib/site.ts';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const i18n = useI18n();
	const alternates = $derived(alternatesFor(page.url.pathname));
	const otherLocale = $derived(i18n.locale === 'tr' ? 'en' : 'tr');

	const organizationId = `${SITE_URL}/#organization`;

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfessionalService',
				'@id': organizationId,
				name: SITE_NAME,
				description: i18n.t.meta.description,
				url: SITE_URL,
				image: `${SITE_URL}/og-image.jpg`,
				logo: `${SITE_URL}/icon-512.png`,
				telephone: contact.phoneE164,
				email: contact.email,
				address: {
					'@type': 'PostalAddress',
					addressLocality: contact.district,
					addressRegion: contact.city,
					addressCountry: 'TR'
				},
				areaServed: { '@type': 'City', name: contact.city },
				knowsLanguage: ['tr', 'en'],
				sameAs: [contact.instagramUrl],
				contactPoint: {
					'@type': 'ContactPoint',
					telephone: contact.phoneE164,
					email: contact.email,
					contactType: 'customer service',
					availableLanguage: ['Turkish', 'English']
				},
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: i18n.t.nav.services,
					itemListElement: serviceIds.map((id) => ({
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: i18n.t.services[id].title,
							url: `${SITE_URL}${i18n.servicePath(id)}`
						}
					}))
				}
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				name: SITE_NAME,
				url: `${SITE_URL}${pagePath('home', i18n.locale)}`,
				inLanguage: i18n.locale,
				publisher: { '@id': organizationId }
			}
		]
	});

	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	{#if alternates}
		<link rel="canonical" href="{SITE_URL}{alternates[i18n.locale]}">
		{#each locales as locale (locale)}
			<link rel="alternate" hreflang={locale} href="{SITE_URL}{alternates[locale]}">
		{/each}
		<link rel="alternate" hreflang="x-default" href="{SITE_URL}{alternates.tr}">
		<meta property="og:url" content="{SITE_URL}{alternates[i18n.locale]}">
	{/if}
	<meta property="og:type" content="website">
	<meta property="og:site_name" content={SITE_NAME}>
	<link rel="preload" href={fontLatin} as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href={fontLatinExt} as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="manifest" href="/manifest.webmanifest">
	<meta property="og:locale" content={ogLocales[i18n.locale]}>
	<meta property="og:locale:alternate" content={ogLocales[otherLocale]}>
	<meta property="og:image" content="{SITE_URL}/og-image.jpg">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:alt" content="{SITE_NAME}, {i18n.t.meta.tagline}">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:image" content="{SITE_URL}/og-image.jpg">
</svelte:head>

<JsonLd data={jsonLd} />

<a class="skip-link" href="#main">{i18n.t.nav.skipToContent}</a>

<Header />

<main id="main" tabindex="-1" class="outline-none">
	{@render children()}
</main>

<Footer />
