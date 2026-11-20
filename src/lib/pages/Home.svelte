<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Steps from '#lib/components/Steps.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { serviceIds } from '#lib/i18n/index.ts';
	import { images, serviceImages } from '#lib/images.ts';

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const home = $derived(i18n.t.home);

	/** Service shown in the preview frame next to the list (desktop only). */
	let activeService = $state(0);
</script>

<Seo seo={home.seo} />

<!-- Hero -->
<section class="hero relative pt-32 pb-16 md:pt-44 md:pb-24">
	<div class="container-site">
		<h1 class="display-xl text-chrome hero-line max-w-[21ch]">{home.hero.title}</h1>

		<div class="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-end">
			<p class="lede hero-line hero-delay-1 max-w-[56ch] text-chrome-300 lg:col-span-7">
				{home.hero.lede}
			</p>
			<div class="hero-line hero-delay-2 flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
				<a href={i18n.path('contact')} class="btn btn-chrome">{home.hero.primary}</a>
				<a href={i18n.path('services')} class="btn btn-outline">{home.hero.secondary}</a>
			</div>
		</div>

		<div class="mt-14 md:mt-20">
			<Frame
				src={images.coast}
				alt={home.hero.imageAlt}
				ratio="cinema"
				position="50% 58%"
				sizes="(min-width: 1280px) 1184px, calc(100vw - 2.5rem)"
				priority
			/>
		</div>

		<ul class="hero-index mt-10 hidden md:grid" aria-label={t.nav.services}>
			{#each serviceIds as id (id)}
				<li>
					<a href={i18n.servicePath(id)} class="hero-index-link">{t.services[id].title}</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Services -->
<section class="section-y border-t border-line-soft" aria-labelledby="services-title">
	<div class="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<div class="lg:sticky lg:top-28">
				<h2 id="services-title" class="display-lg text-chrome">{home.services.title}</h2>
				<p class="lede mt-5 max-w-[44ch] text-chrome-300">{home.services.intro}</p>

				<div class="preview mt-12 hidden lg:block" aria-hidden="true">
					{#each serviceIds as id, index (id)}
						<enhanced:img
							src={serviceImages[id].src}
							alt=""
							sizes="480px"
							loading="lazy"
							class={['preview-image', index === activeService && 'is-active']}
							style:object-position={serviceImages[id].position}
						/>
					{/each}
					<span class="preview-corner tl"></span>
					<span class="preview-corner br"></span>
				</div>
			</div>
		</div>

		<ul class="border-t border-line lg:col-span-7">
			{#each serviceIds as id, index (id)}
				<li class="border-b border-line">
					<a
						href={i18n.servicePath(id)}
						class="service-row"
						onmouseenter={() => (activeService = index)}
						onfocus={() => (activeService = index)}
					>
						<div class="min-w-0">
							<h3 class="service-title display-md text-chrome-50">{t.services[id].title}</h3>
							<p class="mt-3 max-w-[50ch] text-chrome-300">{t.services[id].short}</p>
						</div>
						<span class="service-arrow" aria-hidden="true">
							<Icon name="arrow-up-right" size={20} />
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Meta ads -->
<section class="on-paper bg-paper section-y text-ink" aria-labelledby="meta-title">
	<div class="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
		<div class="lg:col-span-5">
			<Frame
				src={images.metaAds}
				alt={home.meta.imageAlt}
				ratio="portrait"
				position="50% 30%"
				sizes="(min-width: 1024px) 460px, calc(100vw - 2.5rem)"
			/>
		</div>
		<div class="lg:col-span-6 lg:col-start-7">
			<h2 id="meta-title" class="display-lg">{home.meta.title}</h2>
			<p class="lede mt-6 max-w-[58ch] text-ink-muted">{home.meta.text}</p>
			<ul class="mt-10 border-t border-paper-line">
				{#each home.meta.points as point (point)}
					<li class="flex items-baseline gap-4 border-b border-paper-line py-4 font-medium">
						<span class="bullet"></span>
						{point}
					</li>
				{/each}
			</ul>
			<a href={i18n.servicePath('meta-ads')} class="link-arrow mt-10">
				{home.meta.link}
				<Icon name="arrow-right" size={18} />
			</a>
		</div>
	</div>
</section>

<!-- Process -->
<section class="section-y bg-pine-950" aria-labelledby="process-title">
	<div class="container-site">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div>
				<h2 id="process-title" class="display-lg text-chrome">{home.process.title}</h2>
				<p class="lede mt-5 max-w-[52ch] text-chrome-300">{home.process.intro}</p>
			</div>
			<a href={i18n.path('process')} class="link-arrow shrink-0 text-chrome-100">
				{home.process.link}
				<Icon name="arrow-right" size={18} />
			</a>
		</div>
		<div class="mt-16">
			<Steps steps={home.process.steps} />
		</div>
	</div>
</section>

<!-- Principles -->
<section class="section-y border-t border-line" aria-labelledby="principles-title">
	<div class="container-site grid gap-12 lg:grid-cols-12">
		<h2 id="principles-title" class="display-lg text-chrome lg:col-span-4">
			{home.principles.title}
		</h2>
		<div class="grid gap-12 md:grid-cols-3 md:gap-10 lg:col-span-8">
			{#each home.principles.items as item (item.title)}
				<div>
					<div class="rule-chrome"></div>
					<h3 class="display-sm mt-6 text-chrome-50">{item.title}</h3>
					<p class="mt-3 text-[0.9375rem] leading-relaxed text-chrome-300">{item.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<CtaBand />

<style>
	.hero {
		background:
			radial-gradient(80% 60% at 90% 0%, rgb(39 90 68 / 0.45) 0%, transparent 60%),
			radial-gradient(60% 50% at 0% 100%, rgb(17 48 34 / 0.6) 0%, transparent 70%);
	}

	.hero-line {
		animation: hero-rise 1000ms var(--ease-out-soft) both;
	}

	.hero-delay-1 {
		animation-delay: 140ms;
	}

	.hero-delay-2 {
		animation-delay: 260ms;
	}

	@keyframes hero-rise {
		from {
			opacity: 0;
			translate: 0 18px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	.hero-index {
		grid-template-columns: repeat(5, minmax(0, 1fr));
		border-top: 1px solid var(--color-line);
		animation: hero-rise 900ms var(--ease-out-soft) 1500ms both;
	}

	.hero-index li + li {
		border-left: 1px solid var(--color-line);
	}

	.hero-index-link {
		display: block;
		height: 100%;
		padding: 1rem 1rem 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		font-stretch: 106%;
		line-height: 1.35;
		color: var(--color-chrome-300);
		transition: color 200ms ease;
	}

	.hero-index li:first-child .hero-index-link {
		padding-left: 0;
	}

	.hero-index-link:hover {
		color: var(--color-chrome-50);
	}

	/* Services preview: one frame, five stacked photos that cross-fade as rows are hovered. */
	.preview {
		position: relative;
		aspect-ratio: 4 / 3;
		max-width: 30rem;
		background-color: var(--color-pine-850);
	}

	.preview :global(.preview-image) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		scale: 1.04;
		transition:
			opacity 600ms ease,
			scale 1200ms var(--ease-out-soft);
	}

	.preview :global(.preview-image.is-active) {
		opacity: 1;
		scale: 1;
	}

	.preview-corner {
		position: absolute;
		width: 20px;
		height: 20px;
		border: 0 solid var(--color-chrome-300);
	}

	.preview-corner.tl {
		top: -10px;
		left: -10px;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.preview-corner.br {
		right: -10px;
		bottom: -10px;
		border-right-width: 1px;
		border-bottom-width: 1px;
	}

	.service-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.5rem;
		padding-block: 2rem;
	}

	.service-title {
		transition: translate 400ms var(--ease-out-soft);
	}

	.service-row:hover .service-title,
	.service-row:focus-visible .service-title {
		translate: 6px 0;
	}

	.service-arrow {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.75rem;
		height: 2.75rem;
		border: 1px solid var(--color-line);
		border-radius: 999px;
		color: var(--color-chrome-200);
		transition:
			background-color 300ms ease,
			border-color 300ms ease,
			color 300ms ease;
	}

	.service-row:hover .service-arrow,
	.service-row:focus-visible .service-arrow {
		background-color: var(--color-chrome-100);
		border-color: var(--color-chrome-100);
		color: var(--color-pine-900);
	}
</style>
