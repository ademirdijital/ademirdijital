<script lang="ts">
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Frame from '#lib/components/Frame.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { useI18n } from '#lib/i18n/context.ts';
	import { images } from '#lib/images.ts';
	import { contact } from '#lib/site.ts';

	const i18n = useI18n();
	const about = $derived(i18n.t.about);
</script>

<Seo seo={about.seo} />

<PageHeader title={about.title} lede={about.lede} />

<section class="pb-20 md:pb-28" aria-labelledby="story-title">
	<div class="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
		<div class="lg:col-span-5">
			<Frame
				src={images.cinematographer}
				alt={about.story.imageAlt}
				ratio="portrait"
				position="50% 30%"
				sizes="(min-width: 1024px) 460px, calc(100vw - 2.5rem)"
				eager
			/>
		</div>
		<div class="lg:col-span-6 lg:col-start-7">
			<h2 id="story-title" class="display-lg text-chrome">{about.story.title}</h2>
			<div class="mt-8 space-y-5">
				{#each about.story.paragraphs as paragraph (paragraph)}
					<p class="lede text-chrome-300">{paragraph}</p>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="on-paper bg-paper section-y text-ink">
	<div class="container-site grid gap-12 md:grid-cols-2 md:gap-0">
		{#each [about.mission, about.vision] as block, index (block.title)}
			<div
				class={[
					index === 1 && 'md:border-l md:border-paper-line md:pl-12 lg:pl-16',
					index === 0 && 'md:pr-12 lg:pr-16'
				]}
			>
				<h2 class="display-md">{block.title}</h2>
				<p class="lede mt-5 max-w-[46ch] text-ink-muted">{block.text}</p>
			</div>
		{/each}
	</div>
</section>

<section class="section-y" aria-labelledby="values-title">
	<div class="container-site">
		<h2 id="values-title" class="display-lg text-chrome">{about.values.title}</h2>
		<ul class="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
			{#each about.values.items as item (item.title)}
				<li>
					<div class="rule-chrome"></div>
					<h3 class="display-sm mt-6 text-chrome-50">{item.title}</h3>
					<p class="mt-3 text-[0.9375rem] leading-relaxed text-chrome-300">{item.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section-y border-t border-line bg-pine-950" aria-labelledby="location-title">
	<div class="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
		<div class="lg:col-span-5">
			<h2 id="location-title" class="display-lg text-chrome">{about.location.title}</h2>
			<p class="lede mt-6 max-w-[48ch] text-chrome-300">{about.location.text}</p>
			<dl class="mt-10 space-y-4 text-[0.9375rem]">
				<div class="flex items-center gap-3">
					<dt class="text-chrome-400">
						<Icon name="pin" size={18} /><span class="sr-only">{i18n.t.contact.address}</span>
					</dt>
					<dd class="text-chrome-100">{contact.district}, {contact.city}</dd>
				</div>
				<div class="flex items-center gap-3">
					<dt class="text-chrome-400">
						<Icon name="phone" size={18} /><span class="sr-only">{i18n.t.contact.phone}</span>
					</dt>
					<dd>
						<a href={contact.phoneHref} class="link-line text-chrome-100">{contact.phoneDisplay}</a>
					</dd>
				</div>
			</dl>
		</div>
		<div class="lg:col-span-7">
			<Frame
				src={images.filmingCity}
				alt={about.location.imageAlt}
				ratio="wide"
				position="50% 42%"
				sizes="(min-width: 1280px) 690px, (min-width: 1024px) 56vw, calc(100vw - 2.5rem)"
			/>
		</div>
	</div>
</section>

<CtaBand />
