<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { type PageKey, serviceIds } from '#lib/i18n/index.ts';
	import { contact, mailHref, SITE_NAME, whatsappHref } from '#lib/site.ts';
	import Icon from './Icon.svelte';
	import Logo from './Logo.svelte';

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const year = new Date().getFullYear();
	const companyKeys: PageKey[] = ['about', 'process', 'contact'];
</script>

<footer class="border-t border-line bg-pine-950 text-chrome-300">
	<div class="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12">
		<div class="lg:col-span-4">
			<a href={i18n.path('home')} aria-label="{SITE_NAME}, {t.nav.home}" class="inline-block">
				<Logo />
			</a>
			<p class="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-chrome-400">
				{t.footer.about}
			</p>
			<div class="mt-8 flex gap-2">
				<a
					href={contact.instagramUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="social"
					aria-label="Instagram {contact.instagramHandle}"
				>
					<Icon name="instagram" size={20} />
				</a>
				<a
					href={whatsappHref(t.contact.whatsappMessage)}
					target="_blank"
					rel="noopener noreferrer"
					class="social"
					aria-label={t.contact.whatsapp}
				>
					<Icon name="whatsapp" size={20} />
				</a>
				<a href={mailHref(t.contact.emailSubject)} class="social" aria-label={t.contact.email}>
					<Icon name="mail" size={20} />
				</a>
			</div>
		</div>

		<nav class="lg:col-span-3" aria-labelledby="footer-services">
			<h2 id="footer-services" class="footer-title">{t.footer.services}</h2>
			<ul class="mt-5 space-y-3 text-[0.9375rem]">
				{#each serviceIds as id (id)}
					<li>
						<a href={i18n.servicePath(id)} class="link-line hover:text-chrome-50"
							>{t.services[id].title}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<nav class="lg:col-span-2" aria-labelledby="footer-company">
			<h2 id="footer-company" class="footer-title">{t.footer.company}</h2>
			<ul class="mt-5 space-y-3 text-[0.9375rem]">
				{#each companyKeys as key (key)}
					<li>
						<a href={i18n.path(key)} class="link-line hover:text-chrome-50">{t.nav[key]}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="lg:col-span-3">
			<h2 class="footer-title">{t.footer.contact}</h2>
			<ul class="mt-5 space-y-3 text-[0.9375rem]">
				<li>
					<a href={contact.phoneHref} class="link-line hover:text-chrome-50"
						>{contact.phoneDisplay}</a
					>
				</li>
				<li>
					<a
						href={mailHref(t.contact.emailSubject)}
						class="link-line break-all hover:text-chrome-50"
					>
						{contact.email}
					</a>
				</li>
				<li>
					<a
						href={contact.instagramUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="link-line hover:text-chrome-50"
					>
						{contact.instagramHandle}
					</a>
				</li>
				<li class="text-chrome-400">{contact.district}, {contact.city}</li>
			</ul>
		</div>
	</div>

	<div class="border-t border-line-soft">
		<div
			class="container-site flex flex-col gap-2 py-6 text-[0.8125rem] text-chrome-500 sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {SITE_NAME}. {t.footer.rights}</p>
			<p>{t.footer.photoCredit}</p>
		</div>
	</div>
</footer>

<style>
	.footer-title {
		font-size: 0.875rem;
		font-weight: 600;
		font-stretch: 110%;
		color: var(--color-chrome-100);
	}

	.social {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border: 1px solid var(--color-line);
		border-radius: 4px;
		color: var(--color-chrome-200);
		transition:
			border-color 200ms ease,
			color 200ms ease,
			background-color 200ms ease;
	}

	.social:hover {
		border-color: var(--color-chrome-400);
		color: var(--color-chrome-50);
		background-color: var(--color-pine-850);
	}
</style>
