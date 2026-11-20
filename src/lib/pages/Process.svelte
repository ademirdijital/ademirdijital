<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { images } from '#lib/images.ts';

	const i18n = useI18n();
	const process = $derived(i18n.t.process);
</script>

<Seo seo={process.seo} />

<PageHeader title={process.title} lede={process.lede}>
	<div class="mt-14 md:mt-20">
		<Frame
			src={images.gimbal}
			alt={process.imageAlt}
			ratio="cinema"
			position="50% 38%"
			sizes="(min-width: 1280px) 1184px, calc(100vw - 2.5rem)"
			priority
		/>
	</div>
</PageHeader>

<section class="pb-20 md:pb-28">
	<div class="container-site">
		<ol class="timeline">
			{#each process.steps as step, index (step.title)}
				<li class="timeline-step grid gap-6 py-12 md:grid-cols-12 md:gap-8 md:py-16">
					<span class="timeline-rule" aria-hidden="true"></span>
					<div class="md:col-span-2">
						<span class="display-lg text-chrome tabular-nums"
							>{String(index + 1).padStart(2, '0')}</span
						>
					</div>
					<div class="md:col-span-6">
						<h2 class="display-md text-chrome-50">{step.title}</h2>
						<p class="lede mt-4 max-w-[56ch] text-chrome-300">{step.text}</p>
					</div>
					<div class="md:col-span-4 md:border-l md:border-line md:pl-8">
						<p class="text-sm text-chrome-400">{process.outputLabel}</p>
						<p class="display-sm mt-2 text-chrome-100">{step.output}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="on-paper bg-paper section-y text-ink" aria-labelledby="expectations-title">
	<div class="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<h2 id="expectations-title" class="display-lg">{process.expectations.title}</h2>
			<p class="lede mt-5 max-w-[44ch] text-ink-muted">{process.expectations.intro}</p>
		</div>
		<ul class="border-t border-paper-line lg:col-span-7">
			{#each process.expectations.items as item (item)}
				<li
					class="flex items-baseline gap-4 border-b border-paper-line py-5 text-[1.0625rem] font-medium"
				>
					<span class="bullet"></span>
					{item}
				</li>
			{/each}
		</ul>
	</div>
</section>

<CtaBand />

<style>
	.timeline-step {
		position: relative;
	}

	/* Each step's rule draws itself across as the step scrolls into view (where supported). */
	.timeline-rule {
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(90deg, var(--color-chrome-300), var(--color-line) 60%);
		transform-origin: left center;
	}

	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.timeline-rule {
				animation: draw-rule linear both;
				animation-timeline: view();
				animation-range: entry 10% cover 40%;
			}
		}
	}

	@keyframes draw-rule {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
</style>
