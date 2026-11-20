<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { serviceIds } from '#lib/i18n/index.ts';
	import { serviceImages } from '#lib/images.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const page = $derived(i18n.t.servicesPage);
</script>

<Seo seo={page.seo} />

<PageHeader title={page.title} lede={page.lede} />

<section class="pb-20 md:pb-28">
	<div class="container-site">
		<ul class="space-y-24 md:space-y-32">
			{#each serviceIds as id, index (id)}
				{@const service = t.services[id]}
				{@const image = serviceImages[id]}
				<li class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
					<div class={['lg:col-span-7', index % 2 === 1 && 'lg:order-2']}>
						<Frame
							src={image.src}
							alt={image.alt[i18n.locale]}
							ratio="photo"
							position={image.position}
							sizes="(min-width: 1280px) 680px, (min-width: 1024px) 56vw, calc(100vw - 2.5rem)"
							eager={index === 0}
						/>
					</div>
					<div class="lg:col-span-5">
						<h2 class="display-lg text-chrome">
							<a href={i18n.servicePath(id)}>{service.title}</a>
						</h2>
						<p class="lede mt-5 text-chrome-300">{service.summary}</p>
						<ul class="mt-8 space-y-3 text-[0.9375rem] text-chrome-200">
							{#each service.scope.slice(0, 4) as item (item.title)}
								<li class="flex items-baseline gap-3">
									<span class="bullet"></span>
									{item.title}
								</li>
							{/each}
						</ul>
						<a href={i18n.servicePath(id)} class="btn btn-outline mt-10">
							{page.details}
							<span class="sr-only">: {service.title}</span>
						</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="on-paper bg-paper section-y text-ink" aria-labelledby="together-title">
	<div class="container-site grid gap-8 lg:grid-cols-12 lg:gap-16">
		<h2 id="together-title" class="display-lg lg:col-span-5">{page.together.title}</h2>
		<div class="lg:col-span-7">
			<p class="lede max-w-[60ch] text-ink-muted">{page.together.text}</p>
			<a href={i18n.path('contact')} class="btn btn-chrome mt-8">{t.nav.cta}</a>
		</div>
	</div>
</section>

<CtaBand />
