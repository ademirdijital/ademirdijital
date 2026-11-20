<script lang="ts">
	import mark from '#lib/assets/brand/mark.png?w=1000;600&enhanced';
	import { useI18n } from '#lib/i18n/context.ts';
	import { contact, mailHref, whatsappHref } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	const i18n = useI18n();
	const t = $derived(i18n.t);
</script>

<section class="cta relative overflow-hidden border-t border-line" aria-labelledby="cta-title">
	<enhanced:img src={mark} alt="" sizes="(min-width: 1024px) 560px, 70vw" class="cta-mark" />

	<div class="container-site relative section-y">
		<div class="max-w-3xl">
			<h2 id="cta-title" class="display-lg text-chrome">{t.cta.title}</h2>
			<p class="lede mt-6 max-w-[54ch] text-chrome-300">{t.cta.text}</p>

			<div class="mt-10 flex flex-col gap-3 sm:flex-row">
				<a href={contact.phoneHref} class="btn btn-chrome">
					<Icon name="phone" size={18} />
					<span>{t.cta.call}<span class="sr-only">: </span></span>
					<span class="font-normal tabular-nums opacity-80">{contact.phoneDisplay}</span>
				</a>
				<a
					href={whatsappHref(t.contact.whatsappMessage)}
					class="btn btn-outline"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon name="whatsapp" size={18} />
					{t.cta.whatsapp}
				</a>
			</div>

			<p class="mt-8 text-[0.9375rem] text-chrome-400">
				{t.cta.orReach}
				<a
					href={mailHref(t.contact.emailSubject)}
					class="link-line ml-1 text-chrome-200 hover:text-chrome-50"
					>{contact.email}</a
				>
				<span aria-hidden="true" class="mx-2 text-chrome-500">/</span>
				<a
					href={contact.instagramUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="link-line text-chrome-200 hover:text-chrome-50"
				>
					{contact.instagramHandle}
				</a>
			</p>
		</div>
	</div>
</section>

<style>
	.cta {
		background:
			radial-gradient(90% 120% at 100% 100%, var(--color-pine-700) 0%, transparent 55%),
			var(--color-pine-850);
	}

	.cta :global(.cta-mark) {
		position: absolute;
		right: -6%;
		bottom: -18%;
		width: min(560px, 70vw);
		height: auto;
		opacity: 0.16;
		pointer-events: none;
		user-select: none;
		mask-image: linear-gradient(200deg, #000 30%, transparent 85%);
	}

	@media (width < 48rem) {
		.cta :global(.cta-mark) {
			opacity: 0.08;
		}
	}
</style>
