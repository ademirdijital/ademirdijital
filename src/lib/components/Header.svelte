<script lang="ts">
	import { useI18n } from '#lib/i18n/context.ts';
	import { alternatesFor, type Locale, type PageKey, serviceIds } from '#lib/i18n/index.ts';
	import { contact, whatsappHref } from '#lib/site.ts';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	import Logo from './Logo.svelte';

	const i18n = useI18n();
	const t = $derived(i18n.t);

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let menuButton = $state<HTMLButtonElement>();

	const navKeys: PageKey[] = ['services', 'process', 'about', 'contact'];

	const otherLocale = $derived<Locale>(i18n.locale === 'tr' ? 'en' : 'tr');
	const switchHref = $derived(
		alternatesFor(page.url.pathname)?.[otherLocale] ?? (otherLocale === 'en' ? '/en/' : '/')
	);

	function isActive(key: PageKey): boolean {
		const target = i18n.path(key);
		return page.url.pathname === target || page.url.pathname.startsWith(target);
	}

	function closeMenu(focusButton = false) {
		menuOpen = false;
		if (focusButton) menuButton?.focus();
	}

	afterNavigate(() => {
		menuOpen = false;
	});

	$effect(() => {
		document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 12)}
	onkeydown={(event) => {
		if (event.key === 'Escape' && menuOpen) closeMenu(true);
	}}
/>

<header class="site-header" class:scrolled={scrolled || menuOpen}>
	<div class="container-site flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
		<a
			href={i18n.path('home')}
			class="relative z-10 shrink-0"
			aria-label="Ademir Dijital, {t.nav.home}"
		>
			<Logo />
		</a>

		<nav aria-label={t.nav.mainNav} class="hidden lg:block">
			<ul class="flex items-center gap-9 text-[0.9375rem]">
				{#each navKeys as key (key)}
					{#if key === 'services'}
						<li class="group relative">
							<a
								href={i18n.path(key)}
								class="link-line inline-flex items-center gap-1.5 py-2 text-chrome-200 transition-colors hover:text-chrome-50"
								aria-current={isActive(key) ? 'page' : undefined}
							>
								{t.nav[key]}
								<Icon
									name="chevron-down"
									size={14}
									class="transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
								/>
							</a>
							<div class="dropdown">
								<ul
									class="w-[22rem] border border-line bg-pine-850/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
								>
									{#each serviceIds as id (id)}
										<li>
											<a
												href={i18n.servicePath(id)}
												class="block rounded-[3px] px-4 py-3 transition-colors hover:bg-pine-700/50"
											>
												<span class="block text-[0.9375rem] font-semibold text-chrome-50">
													{t.services[id].title}
												</span>
												<span class="mt-0.5 block text-sm leading-snug text-chrome-400">
													{t.services[id].short}
												</span>
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</li>
					{:else}
						<li>
							<a
								href={i18n.path(key)}
								class="link-line py-2 text-chrome-200 transition-colors hover:text-chrome-50"
								aria-current={isActive(key) ? 'page' : undefined}
							>
								{t.nav[key]}
							</a>
						</li>
					{/if}
				{/each}
			</ul>
		</nav>

		<div class="relative z-10 flex items-center gap-3 md:gap-5">
			<a
				href={switchHref}
				hreflang={otherLocale}
				lang={otherLocale}
				class="lang-switch"
				title={t.nav.switchLanguage}
				data-sveltekit-noscroll
			>
				<span class:active={i18n.locale === 'tr'}>TR</span>
				<span class="text-chrome-500">/</span>
				<span class:active={i18n.locale === 'en'}>EN</span>
				<span class="sr-only">, {t.nav.switchLanguage}</span>
			</a>
			<a href={i18n.path('contact')} class="btn btn-chrome hidden min-h-11 md:inline-flex">
				{t.nav.cta}
			</a>
			<button
				bind:this={menuButton}
				type="button"
				class="-mr-2 grid size-11 place-items-center text-chrome-100 lg:hidden"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'close' : 'menu'} size={24} />
			</button>
		</div>
	</div>
</header>

<div id="mobile-menu" class="mobile-menu lg:hidden" class:open={menuOpen} inert={!menuOpen}>
	<nav aria-label={t.nav.mainNav} class="container-site flex min-h-full flex-col pt-28 pb-10">
		<ul class="space-y-1">
			<li>
				<a
					href={i18n.path('home')}
					class="mobile-link"
					aria-current={page.url.pathname === i18n.path('home') ? 'page' : undefined}
				>
					{t.nav.home}
				</a>
			</li>
			{#each navKeys as key (key)}
				<li>
					<a
						href={i18n.path(key)}
						class="mobile-link"
						aria-current={isActive(key) ? 'page' : undefined}
					>
						{t.nav[key]}
					</a>
					{#if key === 'services'}
						<ul class="mb-3 ml-1 space-y-0.5 border-l border-line pl-4">
							{#each serviceIds as id (id)}
								<li>
									<a
										href={i18n.servicePath(id)}
										class="block py-1.5 text-chrome-300 hover:text-chrome-50"
									>
										{t.services[id].title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="mt-auto space-y-3 pt-10">
			<a href={contact.phoneHref} class="btn btn-chrome w-full">
				<Icon name="phone" size={18} />
				{contact.phoneDisplay}
			</a>
			<a
				href={whatsappHref(t.contact.whatsappMessage)}
				class="btn btn-outline w-full"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon name="whatsapp" size={18} />
				{t.cta.whatsapp}
			</a>
		</div>
	</nav>
</div>

<style>
	.site-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		view-transition-name: site-header;
		border-bottom: 1px solid transparent;
		transition:
			background-color 300ms ease,
			border-color 300ms ease,
			backdrop-filter 300ms ease;
	}

	.site-header.scrolled {
		background-color: rgb(10 31 23 / 0.86);
		border-bottom-color: var(--color-line-soft);
		backdrop-filter: blur(14px) saturate(140%);
		-webkit-backdrop-filter: blur(14px) saturate(140%);
	}

	.dropdown {
		position: absolute;
		left: -1rem;
		top: 100%;
		padding-top: 0.75rem;
		visibility: hidden;
		opacity: 0;
		translate: 0 6px;
		transition:
			opacity 220ms ease,
			translate 220ms ease,
			visibility 0s linear 220ms;
	}

	:global(.group:hover) > .dropdown,
	:global(.group:focus-within) > .dropdown {
		visibility: visible;
		opacity: 1;
		translate: 0 0;
		transition:
			opacity 220ms ease,
			translate 220ms ease,
			visibility 0s;
	}

	.lang-switch {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		min-height: 2.75rem;
		padding-inline: 0.25rem;
		font-size: 0.8125rem;
		font-weight: 600;
		font-stretch: 110%;
		letter-spacing: 0.04em;
		color: var(--color-chrome-400);
		transition: color 200ms ease;
	}

	.lang-switch:hover {
		color: var(--color-chrome-100);
	}

	.lang-switch .active {
		color: var(--color-chrome-50);
	}

	.mobile-menu {
		position: fixed;
		inset: 0;
		z-index: 40;
		overflow-y: auto;
		background-color: var(--color-pine-900);
		clip-path: inset(0 0 100% 0);
		transition: clip-path 500ms var(--ease-film);
	}

	.mobile-menu.open {
		clip-path: inset(0 0 0 0);
	}

	.mobile-link {
		display: block;
		padding-block: 0.5rem;
		font-size: 1.75rem;
		font-weight: 600;
		font-stretch: 116%;
		letter-spacing: -0.015em;
		color: var(--color-chrome-100);
	}

	.mobile-link[aria-current='page'] {
		color: var(--color-chrome-50);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.3em;
	}
</style>
