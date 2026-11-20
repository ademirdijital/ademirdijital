<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import JsonLd from '#lib/components/JsonLd.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { type ServiceId, serviceIds } from '#lib/i18n/index.ts';
	import { serviceImages } from '#lib/images.ts';
	import { contact, SITE_URL } from '#lib/site.ts';

	interface Props {
		id: ServiceId;
	}

	let { id }: Props = $props();

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const labels = $derived(i18n.t.serviceDetail);
	const service = $derived(i18n.t.services[id]);
	const image = $derived(serviceImages[id]);
	const others = $derived(serviceIds.filter((other) => other !== id));

	const serviceLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: service.title,
		serviceType: service.title,
		description: service.summary,
		url: `${SITE_URL}${i18n.servicePath(id)}`,
		inLanguage: i18n.locale,
		provider: { '@id': `${SITE_URL}/#organization` },
		areaServed: { '@type': 'City', name: contact.city },
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: labels.scope,
			itemListElement: service.scope.map((item) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name: item.title, description: item.text }
			}))
		}
	});
</script>

<Seo seo={service.seo} />
<JsonLd data={serviceLd} />

<PageHeader
	title={service.title}
	lede={service.summary}
	crumbs={[{ label: t.nav.services, href: i18n.path('services') }]}
>
	<div class="mt-14 md:mt-20">
		{#key id}
			<Frame
				src={image.src}
				alt={image.alt[i18n.locale]}
				ratio="cinema"
				position={image.position}
				sizes="(min-width: 1280px) 1184px, calc(100vw - 2.5rem)"
				priority
			/>
		{/key}
	</div>
</PageHeader>

<section class="pb-20 md:pb-28" aria-labelledby="overview-title">
	<div class="container-site grid gap-8 lg:grid-cols-12 lg:gap-16">
		<h2 id="overview-title" class="display-md text-chrome-100 lg:col-span-4">{labels.overview}</h2>
		<div class="space-y-6 lg:col-span-8">
			{#each service.intro as paragraph (paragraph)}
				<p class="lede max-w-[62ch] text-chrome-200">{paragraph}</p>
			{/each}
		</div>
	</div>
</section>

<section class="section-y border-t border-line" aria-labelledby="scope-title">
	<div class="container-site">
		<h2 id="scope-title" class="display-lg text-chrome">{labels.scope}</h2>
		<ul class="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
			{#each service.scope as item (item.title)}
				<li>
					<div class="rule-chrome"></div>
					<h3 class="display-sm mt-6 text-chrome-50">{item.title}</h3>
					<p class="mt-2 text-[0.9375rem] leading-relaxed text-chrome-300">{item.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="on-paper bg-paper section-y text-ink" aria-labelledby="audience-title">
	<div class="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
		<h2 id="audience-title" class="display-lg lg:col-span-4">{labels.audience}</h2>
		<ul class="grid border-t border-paper-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
			{#each service.audience as audience (audience)}
				<li class="flex items-baseline gap-4 border-b border-paper-line py-4 font-medium">
					<span class="bullet"></span>
					{audience}
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section-y bg-pine-950" aria-labelledby="steps-title">
	<div class="container-site">
		<h2 id="steps-title" class="display-lg text-chrome">{labels.steps}</h2>
		<div class="mt-16">
			<Steps steps={service.steps} />
		</div>
	</div>
</section>

<section class="section-y border-t border-line" aria-labelledby="others-title">
	<div class="container-site">
		<h2 id="others-title" class="display-md text-chrome-100">{labels.others}</h2>
		<ul class="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
			{#each others as other (other)}
				<li class="bg-pine-900">
					<a href={i18n.servicePath(other)} class="other-link group">
						<span class="display-sm text-chrome-50">{t.services[other].title}</span>
						<span class="mt-3 block text-sm leading-relaxed text-chrome-400"
							>{t.services[other].short}</span
						>
						<span
							class="mt-8 inline-flex text-chrome-300 transition-transform duration-300 group-hover:translate-x-1"
						>
							<Icon name="arrow-right" size={18} />
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<CtaBand />

<style>
	.other-link {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1.75rem;
		transition: background-color 250ms ease;
	}

	.other-link:hover {
		background-color: var(--color-pine-850);
	}
</style>
